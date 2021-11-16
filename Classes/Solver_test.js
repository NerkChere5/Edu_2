import {Solver} from './Solver.js';




export class Solver_test extends Solver {
  static _answer_create(key, data) {
    let answer = this._answer_reset_create(key);
    answer.value = {
      legacyAnswers: {
        // answer: data,
        fails: {},
        success: Object.fromEntries(data.map((item) => [item, {}])),
      },
    };
    
    return answer;
  }
  
  
  static _answers_define() {
    let elements = this._template.content.querySelectorAll('vim-test-question');
    this._answers = [];
    this._answers_reset = [];
    
    for (let element of elements) {
      let answer_data = [];
      let answer_key = this._answer_key_extract(element.getAttribute('sync-id'));
      let element_items = element.querySelectorAll('vim-test-item');
      
      for (let i = 0; i < element_items.length; i++) {
        if (!element_items[i].getAttribute('correct')) continue;
        
        answer_data.push(i);
      }
      
      let answer = this._answer_create(answer_key, answer_data);
      let answer_reset = this._answer_reset_create(answer_key);
      this._answers.push(answer);
      this._answers_reset.push(answer_reset);
    }
  }
}
