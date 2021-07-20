import Storage from './localStorage.js';
import Dom from './dom.js';

export default class Events {

  setAllEvents(dom,storage) {
    this.addTask(dom,storage);
  }

  addTask(dom,storage) {
    dom.addInput.addEventListener('keypress', function(e) {
      if(e.key === 'Enter')
      {
        dom.toDoList.pushTask(e.target.value, false,0).orderTask();
        storage.set(dom.toDoList.get());
        dom.render();
      }
    });
  }
}