import ToDoList from './toDoList.js';
export default class Dom {

  constructor(){
    this.toDoList = new ToDoList();
    this.listWrapper = document.querySelector('.to-do-list');
    this.addInput = document.querySelector('.new-task');
  }

  init = (storage) => {
    if( !storage.isEmpty() ) {
      this.toDoList.update(storage.get());
    }
    this.render();
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
    input.dataset.id = id;
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
}