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

    li.classList.add('task','flex');
    section.classList.add('flex');
    li.dataset.id = id;
    input.type = 'checkbox';
    input.checked = completed;
    input.classList.add('completed');
    p.classList.add('description');
    p.innerHTML = description;
    div.innerHTML = 'remove';
    div.classList.add('remove');

    section.append(input, p);
    li.append(section, div);
    return li;
  }

  render() {
    this.listWrapper.innerHTML = ''; // clear the Tasks. Should find better solution
    this.toDoList.get().forEach((elem,i) => this.listWrapper.append(
      this.createNewTask(
        elem.description, elem.completed,i)
        ));
  }
}