import Storage from './localStorage.js';
export default class Events {

  allEvents = [];
  dragTask;


  initEvents() {
    this.allEvents.push(
      { target: 'remove', event: 'click', func: this.remove },
      { target: 'completed', event: 'change', func: this.check },
      { target: '', event: 'keypress', func: this.add },
      { target: 'task', event: 'dragstart', func: this.drag },
      { target: 'task', event: 'dragover', func: this.dragover },
      { target: 'task', event: 'drop', func: this.dropTask },
      { target: 'removeCompleted', event: 'click', func: this.removeCompleted },
      { target: 'description', event: 'keyup', func: this.editTask });
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

  add(target, dom) {
    if(target.value.length)
    {
      dom.toDoList.pushTask(target.value, false, 0).orderTask();
      target.value = '';
      this.refreshScreenAndSetEvents(dom);
    }
  }

  remove(e,dom) {
    dom.toDoList.remove(e.target.parentNode.dataset.id).orderTask();
    this.refreshScreenAndSetEvents(dom);
  }

  check(e,dom) {
    // the id is 1 base, but the array is 0
    // therefore id-1
    dom.change(e.target.dataset.id-1);
    Storage.set(dom.toDoList.get());
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
      dom.toDoList.swap(this.dragTask, e.target.dataset.id).orderTask();
      this.refreshScreenAndSetEvents(dom);
    }
  }

  removeCompleted(e,dom) {
    dom.toDoList.removeCheckedTask().orderTask();
    this.refreshScreenAndSetEvents(dom);
  }

  editTask(e,dom) {
    // because id's are recist.
    const taskId = e.target.previousSibling.dataset.id - 1;
    dom.toDoList.editTask(taskId,e.target.innerHTML);
    Storage.set(dom.toDoList.get());
  }

  setAllEvents(dom) {
    this.allEvents.forEach(e => { this.setEvent(e.target,e.event,e.func,dom)});
  }

  refreshScreenAndSetEvents(dom) {
    Storage.set(dom.toDoList.get());
    dom.render();
    this.setAllEvents(dom);
  }
}