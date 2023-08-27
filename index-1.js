import { EventEmitter } from 'node:events';

class Timer extends EventEmitter {
  constructor() {
    super();
    this.time = 0;
  }

  launchTimer() {
    setInterval(() => {
      ++this.time;
      console.log(`Tick - ${this.time}`);
    }, 1000);
  }
}

const timer = new Timer();

timer.on('printTimerData', timer.launchTimer);
timer.emit('printTimerData');
