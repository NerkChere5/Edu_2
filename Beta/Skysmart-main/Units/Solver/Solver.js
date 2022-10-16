// 18.11.2021


import {Step} from './Modules/Step.js';




export class Solver {
  static _steps = [];
  static _steps_uuids = [];
  static _user_token = '';
  
  
  static url_get__task_data = 'https://api-edu.skysmart.ru/api/v1/lesson/join';
  
  
  
  
  static async _steps_define() {
    this._steps = [];
    
    if (!this._steps_uuids.length) return;
    
    for (let step_uuid of this._steps_uuids) {
      let step = new Step();
      step.uuid = step_uuid;
      
      this._steps.push(step);
    }
    
    let promises = this._steps.map((step) => step.data_define());
    await Promise.all(promises);
  }
  
  
  static async _task_define() {
    let task_hash = location.href.match(/\/(\w+?)\/\d+$/)?.[1];
    
    if (!task_hash) return;
    
    let fetch_opts = {
      body: JSON.stringify({
        roomHash: task_hash,
      }),
      headers: {
        'Authorization': `Bearer ${this._user_token}`,
      },
      method: 'post',
    };
    let task_data = await (await fetch(this.url_get__task_data, fetch_opts)).json();
    
    this._steps_uuids = task_data.taskStudentMeta.steps.map((item) => item.stepUuid);
    
    Step.id_postfix = task_data.taskStudentMeta.variantId;
    Step.task_hash = task_hash;
  }
  
  
  static _user_define() {
    let data = JSON.parse(localStorage.getItem('edu-token-collection'));
    
    if (!data) return;
    
    let user_data = Object.values(data).find((item) => item.jwtData.roles.includes('ROLE_EDU_SKYSMART_STUDENT_USAGE'))
    
    if (!user_data?.jwtData.name) return;
    
    this._user_token = user_data.token;
    
    Step.user_id = user_data.userId;
    Step.user_token = this._user_token;
  }
  
  
  
  
  static async solve(reset = false) {
    this._user_define();
    
    if (!this._user_token) return;
    
    await this._task_define();
    await this._steps_define();
    
    for (let step of this._steps) {
      step.answers_define();
      
      if (reset) {
        step.answers_reset();
      }
      
      await step.answers_save();
      // await step.progress_save();
    }
    
    // let step = this._steps[8];
    
    // step.answers_define();
    
    // if (reset) {
    //   step.answers_reset();
    // }
    
    // await step.answers_save();
    // // await step.progress_save();
  }
}
