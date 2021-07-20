import ToDoList from './toDoList.js';
export default class Dom {

  constructor(){
    this.toDoList = new ToDoList();
  }
  init = (storage) => {
    console.log(this.toDoList);
  }
}