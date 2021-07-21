import Storage from './localStorage.js';
import Dom from './dom.js';

export default class Events {

  allEvents = [];
  refreshScreenAndSetEvents(dom,storage) {
    storage.set(dom.toDoList.get());
    dom.render();
  }

  initEvents() {
    this.allEvents.push(
      { target: 'remove', event: 'click', func: this.remove },
      { target: 'completed', event: 'change', func: this.check },
      { target: '', event: 'keypress', func: this.add });
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
  }

  add(target, dom, storage) {
    if(target.value.length)
    {
      dom.toDoList.pushTask(target.value, false, 0).orderTask();
      this.refreshScreenAndSetEvents(dom, storage);
      target.value = '';
      this.setAllEvents(dom,storage);
    }
  }

  remove(e,dom,storage) {
    dom.toDoList.remove(e.target.parentNode.dataset.id).orderTask();
    this.refreshScreenAndSetEvents(dom, storage);
    this.setAllEvents(dom, storage);
  }

  check(e,dom,storage) {
    dom.change(e.target.dataset.id);
    storage.set(dom.toDoList.get());
  }

  setAllEvents(dom,storage) {
    this.allEvents.forEach(e => { this.setEvent(e.target,e.event,e.func,dom,storage)});
  }


  dragEvent(dom,storage) {
    [...document.querySelectorAll('.task')].forEach(task  => {
      task.addEventListener('drag', function(e){
        console.log(e);
        console.log("dragged");
      })
    });

  }
}