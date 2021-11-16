import {Solver} from './Solver.js';




export class Solver_drop_groups extends Solver {
  static _answer_create(key, data) {
    let answer = this._answer_reset_create(key);
    
    if (data instanceof Array) {
      answer.value = {
        legacyAnswers: {
          answer: data,
          fails: {},
          success: {},
        },
      };
    }
    else {
      answer.value = {
        legacyAnswers: {
          fails: {},
          success: [{
            groupId: data,
          }],
        },
      };
    }
    
    return answer;
  }
  
  
  static _answers_define() {
    let elements_drag = this._template.content.querySelectorAll('vim-dnd-group-drag');
    let elements_drop = this._template.content.querySelectorAll('vim-dnd-group-item');
    let idMap = {};
    this._answers = [];
    this._answers_reset = [];
    
    for (let element of elements_drop) {
      let element_dragIds = element.getAttribute('drag-ids').split(',');
      let element_groupId = element.getAttribute('group-id');
      
      for (let id of element_dragIds) {
        idMap[id] = element_groupId;
      }
      
      let answer_key = this._answer_key_extract(element.getAttribute('sync-id'));
      let answer = this._answer_create(answer_key, element_dragIds);
      let answer_reset = this._answer_reset_create(answer_key);
      this._answers.push(answer);
      this._answers_reset.push(answer_reset);
    }
    
    for (let element of elements_drag) {
      let answer_data = idMap[element.getAttribute('answer-id')];
      let answer_key = this._answer_key_extract(element.getAttribute('sync-id'));
      let answer = this._answer_create(answer_key, answer_data);
      let answer_reset = this._answer_reset_create(answer_key);
      this._answers.push(answer);
      this._answers_reset.push(answer_reset);
    }
  }
}
