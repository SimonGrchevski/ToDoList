import Task from './task.js';
export default class ToDoList {
  constructor() {
    this.tasks = [];
  }

  update(localStorage) {
    this.tasks = localStorage;
  }

  get() {
    return this.tasks;
  }

  toggleComplete(index) {
    this.tasks[index].completed = !this.tasks[index].completed;
  }

  pushTask(desc,completed,id) {
    this.tasks.push(new Task(desc,completed, id));
    return this;
  }

  remove(id) {
    this.tasks.splice(id, 1);
    return this;
  }

  swap(drag,target) {
    // I mean, ID'S man
    const dragId = drag.dataset.id - 1
    const swap = JSON.parse(JSON.stringify(this.tasks[dragId]));
    this.remove(dragId).tasks.splice(target-1, 0, swap);
    return this;
  }

  orderTask() {
    this.tasks.forEach((task, i) => task.id = i+1); // remember ID's?
  }

  removeCheckedTask() {
    this.tasks = this.tasks.filter(task => !task.completed );
    return this;
  }

  editTask(task,description) {
    this.tasks[task].description = description;
  }
}