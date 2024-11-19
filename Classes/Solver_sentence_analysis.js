import {Solver} from './Solver.js';


export class Solver_sentence_analysis extends Solver {
    static _answer_create(key, data) {
        let answer = this._answer_reset_create(key);
        answer.value = {
            answers: data,
        };

        return answer;
    }

    static _answers_define() {
        let elements = this._template.content.querySelectorAll('kids-sentence-analysis');
        this._answers = [];
        this._answers_reset = [];

        for (let element of elements) {
            let answer_data = [];
            let answer_key = this._answer_key_extract(element.getAttribute('id'));
            let answer_type = element.getAttribute('type');
            let element_items = element.querySelectorAll('item, kids-sentence-analysis-item');

            for (let i = 0; i < element_items.length; i++) {
                let element_items_value = element_items[i].getAttribute('value');

                if (!element_items_value) continue;

                answer_data.push({
                    value: {
                        itemId: `${answer_key}_${i + (answer_type != 'color' ? answer_data.length : 1)}`,
                        itemValue: element_items_value,
                    },
                });
            }

            let answer = this._answer_create(answer_key, answer_data);
            let answer_reset = this._answer_reset_create(answer_key);
            this._answers.push(answer);
            this._answers_reset.push(answer_reset);
        }
    }
}
