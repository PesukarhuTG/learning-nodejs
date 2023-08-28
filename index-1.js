import { EventEmitter } from 'node:events';

class Timer extends EventEmitter {
  constructor() {
    super();
    this.time = 0;
  }

  emit(name, ...args) {
    super.emit(name, ...args);
    console.log(`${name} - ${++this.time}`);
    this.launchTimer(name);
  }

  launchTimer(name) {
    setTimeout(() => {
      this.emit(name, this.time);
    }, 1000);
  }
}

const timer = new Timer();

timer.on('Tick', () => {});
timer.emit('Tick');
