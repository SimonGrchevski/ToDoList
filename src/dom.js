import ToDoList from './toDoList.js';
export default class Dom {

  constructor(){
    this.toDoList = new ToDoList();
    this.listWrapper = document.querySelector('.to-do-list');
  }

  init = (storage) => {
    if( !storage.isEmpty() ) {
      this.toDoList.update(storage.get());
    }
    else 
      this.render();
  }

  createNewTask(description,completed,id) {
    const li = document.createElement('li');
    const section = document.createElement('section');
    const input = document.createElement('input');
    const p = document.createElement('p');
    const div = document.createElement('div');

    li.classList.add('task');
    li.id = id;
    input.type = 'checkbox';
    input.checked = completed;
    p.classList.add('description');
    p.innerHTML = description;
    div.innerHTML = 'delete';

    section.append(input, p);
    li.append(section, div);
    return li;
  }

  render() {
    this.toDoList.get().forEach(elem => this.listWrapper.append(
      this.createNewTask(
        elem.description, elem.completed, elem.id)
        ));
  }
}