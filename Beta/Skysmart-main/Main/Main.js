import {Task} from '../Units/Task.js';




let _task = new Task();




async function _on_keydown() {
  if (!event.altKey) return;
  
  if (event.code == 'KeyR') {
    let iterations_count = +prompt('Bot.iterations_count =');
    _task.run(iterations_count);
  }
  else if (event.code == 'KeyS') {
    _task.init();
  }
}




export async function main() {
  window.addEventListener('keydown', _on_keydown);
}
