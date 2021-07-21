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
      [...document.querySelectorAll(`.${target}`)].forEach(rem => {
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
      target.value = '';
      this.refreshScreenAndSetEvents(dom, storage);
    }
  }

  remove(e,dom,storage) {
    dom.toDoList.remove(e.target.parentNode.dataset.id).orderTask();
    this.refreshScreenAndSetEvents(dom, storage);
  }

  check(e,dom,storage) {
    // the id is 1 base, but the array is 0
    // therefore id-1
    dom.change(e.target.dataset.id-1);
    storage.set(dom.toDoList.get());
  }

  drag(e,dom,storage) {
    e.stopPropagation();
    this.dragTask = e.target;
  }

  dragover(e,dom,storage)
  {
    e.preventDefault();
  }

  dropTask(e,dom,storage) {
    if (e.target.classList.contains('task') )
    {
      dom.toDoList.swap(this.dragTask, e.target.dataset.id).orderTask();
      this.refreshScreenAndSetEvents(dom, storage);
    }
  }

  removeCompleted(e,dom, storage) {
    dom.toDoList.removeCheckedTask().orderTask();
    this.refreshScreenAndSetEvents(dom, storage);
  }

  editTask(e,dom,storage) {

    // because id's are recist.
    const taskId = e.target.previousSibling.dataset.id - 1;
    dom.toDoList.editTask(taskId,e.target.innerHTML);
    storage.set(dom.toDoList.get());
  }

  setAllEvents(dom,storage) {
    this.allEvents.forEach(e => { this.setEvent(e.target,e.event,e.func,dom,storage)});
  }

  refreshScreenAndSetEvents(dom, storage) {
    storage.set(dom.toDoList.get());
    dom.render();
    this.setAllEvents(dom, storage);
  }
}