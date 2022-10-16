import * as Common from '../Api/Common.js';
import {TaskPage} from './TaskPage.js';




export class Task {
  static url_complete = 'https://api-edu.skysmart.ru/api/v1/task/complete-for-student';
  static url_get__data = 'https://api-edu.skysmart.ru/api/v1/lesson/join';
  
  
  
  
  _score = 0;
  _taskPages = [];
  _uuids = [];
  _variantId = '';
  
  
  delays = [1000, 5000];
  hash = null;
  maxResult_prob = 1;
  user = null;
  
  
  
  
  get _taskPage_maxResult() {
    return Math.random() < this.maxResult_prob ** (1 / this._taskPages.length);
  }
  
  
  
  
  get variantId() {
    return this._variantId;
  }
  
  
  
  
  async _complete() {
    let fetch_opts = {
      body: JSON.stringify({
        roomHash: this.hash,
      }),
      method: 'post',
    };
    await this.user.fetch(this.constructor.url_complete, fetch_opts);
  }
  
  
  async _data_define() {
    let fetch_opts = {
      body: JSON.stringify({
        roomHash: this.hash,
      }),
      method: 'post',
    };
    let response = await this.user.fetch(this.constructor.url_get__data, fetch_opts);
    let response_data = await response.json();
    this._score = response_data.participants[0].score;
    this._uuids = response_data.taskStudentMeta.steps.map((item) => item.stepUuid);
    this._variantId = response_data.taskStudentMeta.variantId;
  }
  
  
  async _taskPages_define() {
    this._taskPages = [];
    
    if (!this._uuids.length) return;
    
    for (let uuid of this._uuids) {
      let taskPage = new TaskPage();
      taskPage.task = this;
      taskPage.uuid = uuid;
      this._taskPages.push(taskPage);
    }
    
    // let promises = this._taskPages.map((item) => item.init());
    // await Promise.all(promises);
  }
  
  
  
  
  async init() {
    await this._data_define();
    await this._taskPages_define();
  }
  
  
  async solve(reset = false) {
    for (let taskPage of this._taskPages) {
      await taskPage.init();
      taskPage.answers_define();
      
      if (taskPage.answers_count && !this._taskPage_maxResult) continue;
      
      if (reset) {
        taskPage.answers_reset();
      }
      
      await Common.delay(Common.random(...this.delays));
      await taskPage.answers_save();
      await taskPage.progress_save();
      await Common.delay(Common.random(...this.delays));
    }
    
    await this._complete();
  }
}
