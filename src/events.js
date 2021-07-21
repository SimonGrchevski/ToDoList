import Storage from './localStorage.js';
import Dom from './dom.js';

export default class Events {

  refreshScreenAndSetEvents(dom,storage) {
    storage.set(dom.toDoList.get());
    dom.render();
    this.removeEvent(dom, storage);
    this.checkEvent(dom, storage);
  }

  setEvent(target,event,func,dom,storage)
  {
    const self = this;
    switch(event)
    {
      case 'keypress':
        dom.addInput.addEventListener(event, function (e) {
          if (e.key === 'Enter') func.apply(self, [e.target, dom, storage]);
        });
      break;
      
      default: 
      [...document.querySelectorAll("." + target)].forEach(rem => {
        rem.addEventListener(event, function (e) {
          func.apply(self, [e, dom, storage]);
        })
      });
      break;
    }
    // [...document.querySelectorAll("."+target)].forEach(rem => {
    //   rem.addEventListener(event, function (e) {
    //     func.apply(self,[e, dom, storage]);
    //   })
    // });
  }

  add(target, dom, storage) {
    dom.toDoList.pushTask(target.value, false, 0).orderTask();
    this.refreshScreenAndSetEvents(dom, storage);
  }

  remove(e,dom,storage) {
    dom.toDoList.remove(e.target.parentNode.dataset.id).orderTask();
    this.refreshScreenAndSetEvents(dom, storage);
  }

  check(e,dom,storage) {
    dom.change(e.target.dataset.id);
    storage.set(dom.toDoList.get());
  }

  addEvent(dom,storage) {
    // const self = this;
    // dom.addInput.addEventListener('keypress', function(e) {
    //   if (e.key === 'Enter') self.add(e.target,dom,storage);
    // });
    this.setEvent('','keypress',this.add,dom,storage);
    
  }

  removeEvent(dom,storage) {
    this.setEvent('remove', 'click', this.remove,dom,storage);

  }

  checkEvent(dom,storage) {
    this.setEvent('completed', 'change', this.check, dom, storage);
  }
}