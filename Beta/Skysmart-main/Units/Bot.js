import * as Common from '../Api/Common.js';
import {Olympiad} from './Olympiad.js';




export class Bot {
  _active = false;
  _iterations_count_max = 50;
  
  
  delays = [3000, 10000];
  task__maxResult_prob = 0.5;
  task__delays = [2000, 5000];
  
  
  
  
  // async run() {
  async run(iterations_count = 0) {
    if (location.href != 'https://edu.skysmart.ru/contest/russian_secondary_2022/soratinaxolufavu') return;
    
    if (!iterations_count || this._active) return;
    
    iterations_count = Math.min(Math.max(iterations_count, 1), this._iterations_count_max);
    this._active = true;
    
    for (let i = 0; this._active && i < iterations_count; i++) {
      console.log(`Bot.run: olympiad_${i + 1}`);
      
      let olympiad = new Olympiad();
      olympiad.url = location.href;
      olympiad.task.delays = [...this.task__delays];
      olympiad.task.maxResult_prob = this.task__maxResult_prob;
      await olympiad.init();
      await olympiad.task.solve();
      await Common.delay(Common.random(...this.delays));
    }
    
    this._active = false;
    alert('Bot.run: complete');
  }
  
  
  stop() {
    this._active = false;
  }
}
