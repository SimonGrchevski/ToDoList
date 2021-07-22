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

  createNewTask(description,completed,id) {
    const li = document.createElement('li');
    const section = document.createElement('section');
    const input = document.createElement('input');
    const p = document.createElement('p');
    const div = document.createElement('div');
    
    // ================//
    li.classList.add('task','flex');
    li.draggable = true;
    li.dataset.id = id;
    // ================//
    section.classList.add('flex');
    // ================//
    input.type = 'checkbox';
    input.checked = completed;
    // the id should be 1 base
    input.dataset.id = id+1;
    input.classList.add('completed');
    // ================//
    p.classList.add('description');
    p.innerHTML = description;
    p.contentEditable=true;

    // ================//
    div.innerHTML = 'remove';
    div.classList.add('remove','material-icons');
    // ================//
    section.append(input, p);
    li.append(section, div);
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
     this.toDoList.remove(id).orderTask();
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