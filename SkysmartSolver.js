import {Solver_drop_groups} from './Classes/Solver_drop_groups.js';
import {Solver_drop} from './Classes/Solver_drop.js';
import {Solver_match} from './Classes/Solver_match.js';
import {Solver_math} from './Classes/Solver_math.js';
import {Solver_select} from './Classes/Solver_select.js';
import {Solver_sentence_analysis} from './Classes/Solver_sentence_analysis.js';
import {Solver_strike} from './Classes/Solver_strike.js';
import {Solver_test_images} from './Classes/Solver_test_images.js';
import {Solver_test} from './Classes/Solver_test.js';
import {Solver_text} from './Classes/Solver_text.js';
import {Solver} from './Classes/Solver.js';


export class SkysmartSolver {
    static _solvers = [
        Solver_drop,
        Solver_drop_groups,
        Solver_match,
        Solver_math,
        Solver_select,
        Solver_sentence_analysis,
        Solver_strike,
        Solver_test,
        Solver_test_images,
        Solver_text,
    ];


    static url_answers_load = 'https://api-edu.skysmart.ru/api/v1/content/step/load?stepUuid=';
    static url_answers_save = 'https://api-edu.skysmart.ru/api/v1/block/save';
    static url_user_data = 'https://api-edu.skysmart.ru/api/v1/lesson/join';


    static _on__keydown(event) {
        if (!event.altKey) return;

        if (event.code == 'KeyS') {
            this.solve();
        }
        else if (event.code == 'KeyR') {
            this.solve(true);
        }
    }


    static async data__load() {
        let fetch_opts = {
            body: JSON.stringify({
                roomHash: location.href.match(/(\w+)\/\d+$/)[1],
            }),
            credentials: 'include',
            headers: {
                'Authorization': Solver.user_authorization,
            },
            method: 'post',
        };

        let response = await fetch(this.url_user_data, fetch_opts);
        let response_data = await response.json();

        Solver.user_id = response_data.contentRevisionId;
        Solver.uuids = response_data.taskMeta.stepUuids;
        Solver.variant_id = response_data.taskStudentMeta.variantId;
    }

    static init() {
        let data_raw = JSON.parse(localStorage['edu-token-collection']);

        for (let key in data_raw) {
            Solver.user_authorization = `Bearer ${data_raw[key].token}`;
            break;
        }

        Solver.url = this.url_answers_save;
        this.data__load();
        window.addEventListener('keydown', this._on__keydown.bind(this));
    }

    static async solve(reset = false) {
        let step = location.href.match(/\d+$/)[0];
        let uuid = Solver.uuids[step - 1];
        let response = await fetch(this.url_answers_load + uuid, {credentials: 'include'});
        let response_data = await response.json();

        Solver.template_create(response_data.content);
        Solver.user_groupId = response_data.stepRevId + Solver.variant_id;
        console.log(1, response_data.stepRevId);
        // Solver.user_groupId__get();

        for (let solver of this._solvers) {
            solver.answers_save(reset);
        }
    }
}


SkysmartSolver.init();
