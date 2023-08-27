import { EventEmitter } from 'node:events';

class Message extends EventEmitter {
  constructor() {
    super();
    this.username = '';
    this.message = '';
  }

  // расширяем метод emit для вывода в консоль
  emit(name, ...args) {
    super.emit(name, ...args);
    console.log('logger', name, ...args);
  }

  init() {
    //3.2. Функция  receiveMessage подписывется на событие 'getMessage',
    //которое пользователь вызывает при отправке сообщения (п.2)
    this.on('getMessage', this.receiveMessage);

    // вне задания: для себя протестить работу prependListener
    this.prependListener('getMessage', () => {
      console.log('-----');
      console.log(`Сообщение от пользователя ${this.username} получено`);
    });
  }

  // 1. Функция для отправки сообщений пользователями
  sendMessage(username, message) {
    this.username = username;
    this.message = message;

    // 2. после отравки вызывать событие с инфо о сообщении (сработает logger)
    this.emit('getMessage', { username, message });
  }

  // 3.1. Функция для получения сообщения
  receiveMessage() {
    //3.3. ...и выводит информацию о сообщении в консоль.
    console.log(`Полученное сообщение: ${this.message}`);
  }
}

const message = new Message();

// 4. Инициализация функции получения сообщений
message.init();

// 5. Напишите несколько сообщения от пользователя,
//и удостоверьтесь, что сообщения успешно выводятся в консоль
message.sendMessage('Tatiana', 'Hello Node.js!');
message.sendMessage('John', 'Nice to see your code');
message.sendMessage('Alex', 'Looking forward to the next topic');
