import ToDoList from './toDoList.js';
import Storage from './localStorage.js';
export default class Dom {

  constructor(){
    this.toDoList = new ToDoList();
    this.listWrapper = document.querySelector('.to-do-list');
    this.addInput = document.querySelector('.new-task');
  }

  init = () => {
    if( !Storage.isEmpty() ) {
      this.toDoList.update(Storage.get());
    }
    this.render();
  }

  getTasks() {
    return this.toDoList.get();
  }

  setAttr(elem,attr)
  {
    for (const a in attr) {
      elem.setAttribute(a, attr[a]);
    }
  }

  setProp(elem,prop)
  {
    for (const p in prop) {
      elem[p] = prop[p];
    }
  }


  createElement(tag, attr, prop,id)
  {
    const element = document.createElement(tag);
    element.dataset.id = id;
    this.setAttr(element,attr);
    this.setProp(element,prop);
    return element;
  }

  createAllTaskElements(des,completed,id) {
    return [
    this.createElement('li',{'class':'task flex'},{'draggable':true },id),
    this.createElement('section',{'class': 'flex'}, {},id),
    this.createElement(
    'input',{'class':'completed'},{'type':'checkbox','checked':completed},id),
    this.createElement(
    'p',{'class':'description'},{'contentEditable':true,'innerHTML':des},id ),
    this.createElement('div',{'class':'remove material-icons'},{'innerHTML':'remove'},id)
    ];
  }

  createNewTask(description,completed,id) {
  const [li, sec, input, p, div] = this.createAllTaskElements(description,completed,id+1);
  sec.append(input, p);
  li.append(sec, div);
  return li;
  }

  render() {
    this.listWrapper.innerHTML = '';
    this.toDoList.get().forEach((elem,i) => this.listWrapper.append(
      this.createNewTask(
        elem.description, elem.completed,i)
        ));
  }

  change(id) {
    this.toDoList.toggleComplete(id);
  }

  addTask(description,completed,id) {
    this.toDoList.pushTask(description,completed,id).orderTask();
  }

  removeTask(id) {
    this.toDoList.remove(id-1).orderTask();
  }

  swapTask(dragTarg,dropTarg) {
    this.toDoList.swap(dragTarg, dropTarg).orderTask();
  }

  removeChecked() {
    this.toDoList.removeCheckedTask().orderTask();
  }

  edit(id,description) {
    this.toDoList.editTask(id,description);
  }
}