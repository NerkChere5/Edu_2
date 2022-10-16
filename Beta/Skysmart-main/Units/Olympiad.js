import {Task} from './Task.js';
import {TaskPage} from './TaskPage.js';
import {User} from './User/User.js';




export class Olympiad {
  static url_bindTeacher__raw = ['https://api-edu.skysmart.ru/api/v1/promo/student/campaign/', '/bind-to-teacher/', ''];
  static url_get__data__raw = ['https://api-edu.skysmart.ru/api/v1/promo/campaign/', ''];
  static url_get__task_hash = 'https://api-edu.skysmart.ru/api/v1/promo/student/task/create-and-start';
  
  
  
  
  _campaign = '';
  _hash = '';
  _referalHash = '';
  _task = new Task();
  _url_bindTeacher = '';
  _url_get__data = '';
  _user = new User();
  
  
  url = '';
  
  
  
  
  get task() {
    return this._task;
  }
  
  
  get user() {
    return this._user;
  }
  
  
  
  
  async _data_define() {
    let response = await fetch(this._url_get__data);
    let response_data = await response.json();
    this._hash = response_data.data.settings.student.stages[0].hash;
    this._user.data_registration__class_nums = response_data.data.settings.student.limits.grade;
  }
  
  
  async _task_hash_define() {
    let fetch_opts = {
      body: JSON.stringify({
        stageHash: this._hash,
      }),
      method: 'post',
    };
    let response = await this._user.fetch(this.constructor.url_get__task_hash, fetch_opts);
    let response_data = await response.json();
    this._task.hash = response_data.data.roomHash;
  }
  
  
  _url_proc() {
    [this._campaign, this._referalHash] = this.url.match(/(\w+)\/(\w+)$/).slice(1);
    this._url_bindTeacher = String.raw({raw: this.constructor.url_bindTeacher__raw}, this._campaign, this._referalHash);
    this._url_get__data = String.raw({raw: this.constructor.url_get__data__raw}, this._campaign);
  }
  
  
  async _user_bindTeacher() {
    await this._user.fetch(this._url_bindTeacher, {method: 'post'});
  }
  
  
  
  
  async init() {
    this._url_proc();
    await this._data_define();
    
    await this._user.registration();
    await this._user.data_define();
    await this._user_bindTeacher();
    
    await this._task_hash_define();
    this._task.user = this._user;
    await this._task.init();
  }
}
