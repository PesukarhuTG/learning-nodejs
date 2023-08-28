import { EventEmitter } from 'node:events';

class Message extends EventEmitter {
  constructor() {
    super();
    this.username = '';
    this.message = '';
    this.init();
  }

  init() {
    this.on('getMessage', this.receiveMessage);

    // вне задания: для себя протестить работу prependListener
    this.prependListener('getMessage', () => {
      console.log('-----');
      console.log(`Сообщение от пользователя ${this.username} получено`);
    });
  }

  sendMessage(username, message) {
    this.username = username;
    this.message = message;

    this.emit('getMessage', { username, message });
  }

  receiveMessage() {
    console.log(`Текст сообщения: ${this.message}`);
  }
}

const message = new Message();

message.sendMessage('Tatiana', 'Hello Node.js!');
message.sendMessage('John', 'Nice to see your code');
message.sendMessage('Alex', 'Looking forward to the next topic');
