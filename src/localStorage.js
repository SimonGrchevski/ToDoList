export default class Storage {

  set(storage) {
    localStorage.setItem('toDoList',JSON.stringify(storage));
  }
  
  get() {
    return JSON.parse(localStorage.getItem('toDoList'));
  }

  isEmpty() {
    return this.get() === null;
  }
}