import Task from './task.js';
export default class ToDoList {
  constructor() {
    this.tasks = [];
    this.fill();
  }

  update(localStorage) {
    this.task = localStorage;
  }

  get() {
    return this.tasks;
  }

  fill() {
    this.tasks.push(new Task('task1', false,0));
    this.tasks.push(new Task('task2',false,1));
  }

}