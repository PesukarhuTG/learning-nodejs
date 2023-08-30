import { EventEmitter } from 'node:events';

class Message extends EventEmitter {
  constructor(init = true) {
    super();
    if (init) {
      this.receiveMessage();
    }
  }

  sendMessage(username, message) {
    this.emit('getMessage', { username, message });
  }

  receiveMessage() {
    this.on('getMessage', data => {
      console.log(`Текст сообщения: ${data.message}`);
    });

    // вне задания: для себя протестить работу prependListener
    this.prependListener('getMessage', data => {
      console.log(`-----\nСообщение от пользователя ${data.username} получено`);
    });
  }
}

const message = new Message();

message.sendMessage('Tatiana', 'Hello Node.js!');
message.sendMessage('John', 'Nice to see your code');
message.sendMessage('Alex', 'Looking forward to the next topic');
