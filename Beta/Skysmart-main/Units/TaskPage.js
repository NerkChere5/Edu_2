export class TaskPage {
  static url_get__data__raw = ['https://api-edu.skysmart.ru/api/v1/content/step/load?stepUuid=', ''];
  static url_save__answers = 'https://vimbox-store-edu.skysmart.ru/api/v1/block/save';
  static url_save__progress = 'https://api-edu.skysmart.ru/api/v1/user/progress/save';
  
  
  
  
  _answers = [];
  _answers_empty = [];
  _answers_processed = [];
  _id = '';
  _template = null;
  _url_get__data = '';
  
  
  task = null;
  uuid = '';
  
  
  
  
  get answers_count() {
    return this._answers.length;
  }
  
  
  
  
  _answer_create__drop(answer_key, answer_data) {
    let answer = this._answer_create__empty(answer_key);
    answer.value = {
      legacyAnswers: {
        answer: answer_data,
        fails: {},
        success: {
          [answer_data]: {},
        },
      },
    };
    
    return answer;
  }
  
  
  _answer_create__empty(answer_key) {
    return {
      contentGroupId: this._id,
      key: answer_key,
      userId: this.task.user.id,
    };
  }
  
  
  _answer_create__groups(answer_key, answer_data) {
    let answer = this._answer_create__empty(answer_key);
    
    if (answer_data instanceof Array) {
      answer.value = {
        legacyAnswers: {
          answer: answer_data,
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
            groupId: answer_data,
          }],
        },
      };
    }
    
    return answer;
  }
  
  
  _answer_create__match(answer_key, answer_data) {
    let answer = this._answer_create__empty(answer_key);
    answer.value = {
      legacyAnswers: {
        answer: {
          items: answer_data,
        },
        fails: {},
        success: Object.fromEntries(answer_data.filter((item, index) => index % 2).map((item) => [item, {}])),
      },
    };
    
    return answer;
  }
  
  
  _answer_create__math(answer_key, answer_data) {
    let answer = this._answer_create__empty(answer_key);
    answer.value = {
      answers: [{
        checkAnswer: true,
        isCorrect: true,
        value: answer_data,
      }],
    };
    
    return answer;
  }
  
  
  _answer_create__select(answer_key, answer_data) {
    let answer = this._answer_create__empty(answer_key);
    answer.value = {
      legacyAnswers: {
        answer: answer_data,
        fails: {},
        success: {
          [answer_data]: {},
        },
      },
    };
    
    return answer;
  }
  
  
  _answer_create__sentence(answer_key, answer_data) {
    let answer = this._answer_create__empty(answer_key);
    answer.value = {
      answers: answer_data.map(
        (item) => ({
          value: {
            itemId: answer_key + '_' + item.num,
            itemValue: item.value,
          },
        }),
      ),
    };
    
    return answer;
  }
  
  
  _answer_create__strike(answer_key, answer_data) {
    let answer = this._answer_create__empty(answer_key);
    answer.value = {
      legacyAnswers: {
        answer: answer_data[0],
        fails: {},
        success: Object.fromEntries(answer_data.map((item) => [item, {}])),
      },
    };
    
    return answer;
  }
  
  
  _answer_create__test(answer_key, answer_data) {
    let answer = this._answer_create__empty(answer_key);
    answer.value = {
      legacyAnswers: {
        answer: answer_data,
        fails: {},
        success: Object.fromEntries(answer_data.map((item) => [item, {}])),
      },
    };
    
    return answer;
  }
  
  
  _answer_create__test_images(answer_key, answer_data) {
    let answer = this._answer_create__empty(answer_key);
    answer.value = {
      legacyAnswers: {
        answer: answer_data[0],
        fails: {},
        success: Object.fromEntries(answer_data.map((item) => [item, {}])),
      },
    };
    
    return answer;
  }
  
  
  _answer_create__text(answer_key, answer_data) {
    let answer = this._answer_create__empty(answer_key);
    answer.value = {
      legacyAnswers: {
        answer: {
          value: answer_data,
        },
        fails: {},
        success: {
          [answer_data]: {},
        },
      },
    };
    
    return answer;
  }
  
  
  _answer_key_extract(string) {
    return string.match(/[a-z]+\d+$/i)[0];
  }
  
  
  _answers_define__drop() {
    let elements = this._template.content.querySelectorAll('vim-dnd-image-drop, vim-dnd-image-set-drop, vim-dnd-text-drop');
    let idSet = {};
    
    for (let element of elements) {
      let element_dragId = element.getAttribute('drag-ids').split(',').find((item) => !idSet[item]);
      idSet[element_dragId] = true;
      
      let answer_key = this._answer_key_extract(element.getAttribute('sync-id'));
      let answer = this._answer_create__drop(answer_key, element_dragId);
      let answer_empty = this._answer_create__empty(answer_key);
      this._answers.push(answer);
      this._answers_empty.push(answer_empty);
    }
  }
  
  
  _answers_define__groups() {
    let elements_drag = this._template.content.querySelectorAll('vim-dnd-group-drag');
    let elements_drop = this._template.content.querySelectorAll('vim-dnd-group-item');
    let idMap = {};
    
    for (let element of elements_drop) {
      let element_dragIds = element.getAttribute('drag-ids').split(',');
      let element_groupId = element.getAttribute('group-id');
      
      for (let id of element_dragIds) {
        idMap[id] = element_groupId;
      }
      
      let answer_key = this._answer_key_extract(element.getAttribute('sync-id'));
      let answer = this._answer_create__groups(answer_key, element_dragIds);
      let answer_empty = this._answer_create__empty(answer_key);
      this._answers.push(answer);
      this._answers_empty.push(answer_empty);
    }
    
    for (let element of elements_drag) {
      let answer_data = idMap[element.getAttribute('answer-id')];
      let answer_key = this._answer_key_extract(element.getAttribute('sync-id'));
      let answer = this._answer_create__groups(answer_key, answer_data);
      let answer_empty = this._answer_create__empty(answer_key);
      this._answers.push(answer);
      this._answers_empty.push(answer_empty);
    }
  }
  
  
  _answers_define__match() {
    let elements = this._template.content.querySelectorAll('vim-groups');
    
    for (let element of elements) {
      let element_items = element.querySelectorAll('vim-groups-item');
      let answer_data = [...element_items].map((item) => item.getAttribute('sync-id'));
      let answer_key = this._answer_key_extract(element.getAttribute('id'));
      let answer = this._answer_create__match(answer_key, answer_data);
      let answer_empty = this._answer_create__empty(answer_key);
      this._answers.push(answer);
      this._answers_empty.push(answer_empty);
    }
  }
  
  
  _answers_define__math() {
    let elements = this._template.content.querySelectorAll('math-input');
    
    for (let element of elements) {
      let answer_data = element.querySelector('math-input-answer').textContent;
      let answer_key = this._answer_key_extract(element.getAttribute('id'));
      let answer = this._answer_create__math(answer_key, answer_data);
      let answer_empty = this._answer_create__empty(answer_key);
      this._answers.push(answer);
      this._answers_empty.push(answer_empty);
    }
  }
  
  
  _answers_define__select() {
    let elements = this._template.content.querySelectorAll('vim-select');
    
    for (let element of elements) {
      let element_items = element.querySelectorAll('vim-select-item');
      let answer_data = [...element_items].findIndex((item) => item.getAttribute('correct')) + 1;
      let answer_key = this._answer_key_extract(element.getAttribute('id'));
      let answer = this._answer_create__select(answer_key, answer_data);
      let answer_empty = this._answer_create__empty(answer_key);
      this._answers.push(answer);
      this._answers_empty.push(answer_empty);
    }
  }
  
  
  _answers_define__sentence() {
    let elements = this._template.content.querySelectorAll('kids-sentence-analysis:not([type="punctuation"])');
    
    for (let element of elements) {
      let answer_data = [];
      let answer_key = this._answer_key_extract(element.getAttribute('id'));
      let element_item_num_decrement = element.getAttribute('type') == 'stress';
      let element_items = element.querySelectorAll('*');
      
      for (let i = 0; i < element_items.length; i++) {
        let element_item_value = element_items[i].getAttribute('value');
        
        if (!element_item_value) continue;
        
        let answer_data_item = {
          num: i - element_item_num_decrement,
          value: element_item_value,
        };
        answer_data.push(answer_data_item);
      }
      
      let answer = this._answer_create__sentence(answer_key, answer_data);
      let answer_empty = this._answer_create__empty(answer_key);
      this._answers.push(answer);
      this._answers_empty.push(answer_empty);
    }
  }
  
  
  _answers_define__sentence_punctuation() {
    let elements = this._template.content.querySelectorAll('kids-sentence-analysis[type="punctuation"]');
    
    for (let element of elements) {
      let answer_data = [];
      let answer_key = this._answer_key_extract(element.getAttribute('id'));
      let element_items = element.querySelectorAll('item');
      
      for (let i = 0, text_spaces_count = 0; i < element_items.length; i++) {
        let element_item = element_items[i];
        
        let text = ' ' + element_item.previousSibling.data.trim();
        text_spaces_count += text.match(/ +/g).length;
        
        let answer_data_item = {
          num: text_spaces_count * 2 + 1 + i,
          value: element_item.getAttribute('value'),
        };
        answer_data.push(answer_data_item);
      }
      
      let answer = this._answer_create__sentence(answer_key, answer_data);
      let answer_empty = this._answer_create__empty(answer_key);
      this._answers.push(answer);
      this._answers_empty.push(answer_empty);
    }
  }
  
  
  _answers_define__strike() {
    let elements = this._template.content.querySelectorAll('vim-strike-out');
    
    for (let element of elements) {
      let element_items = element.querySelectorAll('vim-strike-out-item[striked="true"]');
      let answer_data = [...element_items].map((item) => item.getAttribute('value'));
      let answer_key = this._answer_key_extract(element.getAttribute('id'));
      let answer = this._answer_create__strike(answer_key, answer_data);
      let answer_empty = this._answer_create__empty(answer_key);
      this._answers.push(answer);
      this._answers_empty.push(answer_empty);
    }
  }
  
  
  _answers_define__test() {
    let elements = this._template.content.querySelectorAll('vim-test-question');
    
    for (let element of elements) {
      let answer_data = [];
      let answer_key = this._answer_key_extract(element.getAttribute('sync-id'));
      let element_items = element.querySelectorAll('vim-test-item');
      
      for (let i = 0; i < element_items.length; i++) {
        if (!element_items[i].getAttribute('correct')) continue;
        
        answer_data.push(i);
      }
      
      let answer = this._answer_create__test(answer_key, answer_data);
      let answer_empty = this._answer_create__empty(answer_key);
      this._answers.push(answer);
      this._answers_empty.push(answer_empty);
    }
  }
  
  
  _answers_define__test_images() {
    let elements = this._template.content.querySelectorAll('vim-test-image');
    
    for (let element of elements) {
      let element_items = element.querySelectorAll('vim-test-image-item[correct="true"]');
      let answer_data = [...element_items].map((item) => item.getAttribute('image-id'));
      let answer_key = this._answer_key_extract(element.getAttribute('id'));
      let answer = this._answer_create__test_images(answer_key, answer_data);
      let answer_empty = this._answer_create__empty(answer_key);
      this._answers.push(answer);
      this._answers_empty.push(answer_empty);
    }
  }
  
  
  _answers_define__text() {
    let elements = this._template.content.querySelectorAll('vim-input');
    
    for (let element of elements) {
      let answer_data = element.querySelector('vim-input-item').textContent;
      let answer_key = this._answer_key_extract(element.getAttribute('id'));
      let answer = this._answer_create__text(answer_key, answer_data);
      let answer_empty = this._answer_create__empty(answer_key);
      this._answers.push(answer);
      this._answers_empty.push(answer_empty);
    }
  }
  
  
  async _data_define() {
    let response = await this.task.user.fetch(this._url_get__data);
    let response_data = await response.json();
    this._id = response_data.stepRevId + this.task.variantId;
    this._template_define(response_data.content);
  }
  
  
  _template_define(html) {
    this._template = document.createElement('template');
    this._template.innerHTML = html;
  }
  
  
  _url_proc() {
    this._url_get__data = String.raw({raw: this.constructor.url_get__data__raw}, this.uuid);
  }
  
  
  
  
  answers_define() {
    this._answers = [];
    this._answers_empty = [];
    this._answers_processed = this._answers;
    
    this._answers_define__drop();
    this._answers_define__groups();
    this._answers_define__test_images();
    this._answers_define__match();
    this._answers_define__math();
    this._answers_define__select();
    this._answers_define__sentence();
    this._answers_define__sentence_punctuation();
    this._answers_define__strike();
    this._answers_define__test();
    this._answers_define__text();
  }
  
  
  answers_process() {
    this._answers_processed[0] = this._answers_empty[0];
  }
  
  
  answers_reset() {
    this._answers_processed = this._answers_empty;
  }
  
  
  async answers_save() {
    if (!this._answers.length) return;
    
    let fetch_opts = {
      body: JSON.stringify(this._answers_processed),
      method: 'post',
    };
    await this.task.user.fetch(this.constructor.url_save__answers, fetch_opts);
  }
  
  
  async init() {
    this._url_proc();
    await this._data_define();
  }
  
  
  async progress_save() {
    // let answers_correct_count = this._answers_processed.filter((item) => item.value).length;
    // let score = (answers_correct_count / this._answers.length) * 100 ^ 0;
    
    let score = 100;
    let skippedAt = null;
    
    if (!this._answers.length) {
      let date = new Date();
      skippedAt = date.toISOString().match(/.+?T/) + date.toTimeString().replace(/\s+GMT(.{3})(.{2}).*/, '$1:$2');
    }
    
    let fetch_opts = {
      body: JSON.stringify({
        completeness: score,
        progressId: this.uuid,
        progressType: 'step',
        roomHash: this.task.hash,
        score,
        skippedAt,
        userId: this.task.user.id,
      }),
      method: 'post',
    };
    await this.task.user.fetch(this.constructor.url_save__progress, fetch_opts);
  }
}
