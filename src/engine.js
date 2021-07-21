import Events from './events.js';
import Dom from './dom.js';
import Storage from './localStorage.js';

export default class Engine {

  constructor(){
    this.dom = new Dom();
    this.events = new Events();
  }
  init() {
    this.dom.init();
    this.events.initEvents();
    this.events.setAllEvents(this.dom);
  }
}