import {Solver} from './Solver.js';




export class Solver_drop extends Solver {
  static _answer_create(key, data) {
    let answer = this._answer_reset_create(key);
    answer.value = {
      legacyAnswers: {
        answer: data,
        fails: {},
        success: {
          [data]: {},
        },
      },
    };
    
    return answer;
  }
  
  
  static _answers_define() {
    let elements = this._template.content.querySelectorAll('vim-dnd-image-drop, vim-dnd-image-set-drop, vim-dnd-text-drop');
    let idSet = {};
    this._answers = [];
    this._answers_reset = [];
    
    for (let element of elements) {
      let element_dragId = element.getAttribute('drag-ids').split(',').find((item) => !idSet[item]);
      idSet[element_dragId] = true;
      
      let answer_key = this._answer_key_extract(element.getAttribute('sync-id'));
      let answer = this._answer_create(answer_key, element_dragId);
      let answer_reset = this._answer_reset_create(answer_key);
      this._answers.push(answer);
      this._answers_reset.push(answer_reset);
    }
  }
}
