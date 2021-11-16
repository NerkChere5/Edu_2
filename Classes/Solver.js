import {fetch} from '../Api/Network.js';




export class Solver {
  static _answers = null;
  static _answers_reset = null;
  static _template = null;
  
  
  static url = '';
  static user_authorization = '';
  static user_groupId = '';
  static user_id = '';
  
  
  
  
  static _answer_reset_create(key) {
    return {
      contentGroupId: this.user_groupId,
      key: key,
      userId: this.user_id,
    };
  }
  
  
  static _answer_key_extract(string) {
    return string.match(/[a-z]+\d+$/i)[0];
  }
  
  
  static _answers_define() {}
  
  
  
  
  static answers_save(reset = false) {
    this._answers_define();
    
    if (!this._answers.length) return;
    
    let answers = reset ? this._answers_reset : this._answers;
    let fetch_params = {
      body: JSON.stringify(answers),
      headers: {'Authorization': this.user_authorization},
      method: 'post',
    };
    fetch(this.url, fetch_params);
  }
  
  
  static template_create(html) {
    this._template = document.createElement('template');
    this._template.innerHTML = html;
    
    console.log(html);
  }
}
