import Events from './events.js';
import Dom from './dom.js';
import Storage from './localStorage.js';

export default class Engine {

  constructor(){
    this.dom = new Dom();
    this.storage = new Storage();
    this.events = new Events();
  }
  init() {
    this.dom.init(this.storage);
    this.events.initEvents();
    // this.events.addEvent(this.dom, this.storage);
    // this.events.removeEvent(this.dom, this.storage);
    // this.events.checkEvent(this.dom, this.storage);
    this.events.setAllEvents(this.dom,this.storage);
  }
}