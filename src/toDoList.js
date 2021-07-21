import Task from './task.js';
export default class ToDoList {
  constructor() {
    this.tasks = [];
    this.fill();
  }

  update(localStorage) {
    this.tasks = localStorage;
  }

  get() {
    return this.tasks;
  }

  getAt(index) {
    return this.tasks[index];
  }

  pushTask(desc,completed,id) {
    this.tasks.push(new Task(desc,completed, id));
    return this;
  }

  fill() {
    this.tasks.push(new Task('task1', false,0));
    this.tasks.push(new Task('task2',false,1));
  }

  orderTask() {
    this.tasks.forEach((task, i) => task.id = i+1);
  }

  remove(id) {
    this.tasks.splice(id,1,);
    return this;
  }

}