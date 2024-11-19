import {Solver} from './Solver.js';




export class Solver_text extends Solver {
    static _answer_create(key, data) {
        let answer = this._answer_reset_create(key);
        answer.value = {
            legacyAnswers: {
                answer: {
                    // isKeyUsed: false,
                    // isTyping: false,
                    value: data,
                },
                fails: {},
                success: {
                    [data]: {},
                },
            },
        };

        return answer;
    }


    static _answers_define() {
        if (this._answers) return;

        let elements = this._template.content.querySelectorAll('vim-input');
        this._answers = [];
        this._answers_reset = [];

        for (let element of elements) {
            let answer_data = element.querySelector('vim-input-item').textContent;
            let answer_key = this._answer_key_extract(element.getAttribute('id'));
            let answer = this._answer_create(answer_key, answer_data);
            let answer_reset = this._answer_reset_create(answer_key);
            this._answers.push(answer);
            this._answers_reset.push(answer_reset);
        }
    }
}
