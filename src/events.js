import Storage from './localStorage.js';
export default class Events {

  dragTask;

  constructor()
  {
    this.allEvents = [
      { target: 'remove',          event: 'click',     func: this.remove          },
      { target: 'completed',       event: 'change',    func: this.check           },
      { target: '',                event: 'keypress',  func: this.add             },
      { target: 'task',            event: 'dragstart', func: this.drag            },
      { target: 'task',            event: 'dragover',  func: this.dragover        },
      { target: 'task',            event: 'drop',      func: this.dropTask        },
      { target: 'removeCompleted', event: 'click',     func: this.removeCompleted },
      { target: 'description',     event: 'keyup',     func: this.editTask        }
    ]
  }

  setEvent(target,event,func,dom)
  {
    const self = this;
    switch(event)
    {
      case 'keypress':
        dom.addInput.addEventListener(event, function (e) {
          if (e.key === 'Enter') func.apply(self, [e.target,dom]);
        });
      break;
      
      default: 
      [...document.querySelectorAll(`.${target}`)].forEach(rem => {
        rem.addEventListener(event, function (e) {
          func.apply(self, [e, dom]);
        })
      });
      break;
    }
  }

  refreshScreenAndSetEvents(dom) {
    Storage.set(dom.getTasks());
    dom.render();
    this.setAllEvents(dom);
  }

  setAllEvents(dom) {
    this.allEvents.forEach(e => { this.setEvent(e.target, e.event, e.func, dom) });
  }

  add(target, dom) {
    if(target.value.length)
    {
      dom.addTask(target.value,false,0);
      target.value = '';
      this.refreshScreenAndSetEvents(dom);
    }
  }

  remove(e,dom) {
    const id = e.target.dataset.id;
    dom.removeTask(id);
    this.refreshScreenAndSetEvents(dom);
  }

  check(e,dom) {
    // the id is 1 base, but the array is 0
    // therefore id-1
    dom.change(e.target.dataset.id-1);
    Storage.set(dom.getTasks());
  }

  drag(e,dom) {
    e.stopPropagation();
    this.dragTask = e.target;
  }

  dragover(e,dom)
  {
    e.preventDefault();
  }

  dropTask(e,dom) {
    if (e.target.classList.contains('task') )
    {
      dom.swapTask(this.dragTask, e.target.dataset.id);
      this.refreshScreenAndSetEvents(dom);
    }
  }

  removeCompleted(e,dom) {
    dom.removeChecked();
    this.refreshScreenAndSetEvents(dom);
  }

  editTask(e,dom) {
    // because id's are recist.
    const taskId = e.target.dataset.id - 1;
    dom.edit(taskId, e.target.innerHTML);
    Storage.set(dom.getTasks());
  }
}