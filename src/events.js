import Storage from './localStorage.js';
import Dom from './dom.js';

export default class Events {

  setAllEvents(dom,storage) {
    this.removeEvent(dom, storage);
  }

  refresh(dom, storage) {
    storage.set(dom.toDoList.get());
    dom.render();
  }

  add(target, dom, storage) {
    dom.toDoList.pushTask(target.value, false, 0).orderTask();
    this.refresh(dom, storage);
  }

  remove(e,dom,storage) {
    dom.toDoList.remove(e.dataset.id);
    this.refresh(dom, storage);
    this.setAllEvents(dom, storage);
    console.log("inside remove");
  }

  addEvent(dom,storage) {
    dom.addInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') this.add(e.target,dom,storage);
    });
    
  }

  removeEvent(dom,storage) {
    [...document.querySelectorAll('.remove')].forEach(rem  => {
      rem.addEventListener('click',function(e){
        this.remove(e.target, dom, storage);
      })
    });
  }
}