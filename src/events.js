import Storage from './localStorage.js';
import Dom from './dom.js';

export default class Events {

  refreshScreenAndSetEvents(dom,storage) {
    storage.set(dom.toDoList.get());
    dom.render();
    this.removeEvent(dom, storage);
    this.checkEvent(dom, storage);
  }

  add(target, dom, storage) {
    dom.toDoList.pushTask(target.value, false, 0).orderTask();
    this.refreshScreenAndSetEvents(dom, storage);
  }

  remove(e,dom,storage) {
    dom.toDoList.remove(e.dataset.id).orderTask();
    this.refreshScreenAndSetEvents(dom, storage);
  }

  check(e,dom,storage) {
    dom.change(e.dataset.id);
    storage.set(dom.toDoList.get());
  }

  addEvent(dom,storage) {
    const self = this;
    dom.addInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') self.add(e.target,dom,storage);
    });
    
  }

  removeEvent(dom,storage) {
    const self=this;
    [...document.querySelectorAll('.remove')].forEach(rem  => {
      rem.addEventListener('click',function(e){
        self.remove(e.target.parentNode, dom, storage);
      })
    });
  }

  checkEvent(dom,storage){
    const self = this;
    [...document.querySelectorAll('.completed')].forEach(box => {
      box.addEventListener('change',function(e){
        self.check(e.target,dom,storage);
      })
    })
  }
}