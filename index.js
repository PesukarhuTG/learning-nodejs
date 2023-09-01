import { EventEmitter } from 'node:events';
import {
  stat,
  writeFile,
  copyFile,
  truncate,
  readFile,
} from 'node:fs/promises';

class Logger extends EventEmitter {
  constructor(filename, maxSize, init = true) {
    super();
    this.filename = filename;
    this.maxSize = maxSize;
    this.logQueue = [];
    this.writing = false;
    init && this.init();
  }

  init() {
    this.on('messageLogged', message => {
      console.log('Записано сообщение:', message);
    });
  }

  log(message) {
    const logMessage = `${new Date(Date.now()).toISOString()}: ${message}`;

    this.logQueue.unshift(logMessage);

    if (!this.writing) {
      this.writeLog();
      this.writing = true;
    }
  }

  async writeLog() {
    try {
      let currentFileLog = '';

      //ЗАПИСЫВАЕМ ФАЙЛ ЛОГА ИЗ МАССИВА
      const logData = this.logQueue.length ? this.logQueue.join('\n') : '';
      this.logQueue = [];

      // если файл прочитается => он уже существует => данные есть
      await readFile(this.filename, 'utf8')
        .then(data => (currentFileLog = data))
        .catch(err =>
          console.warn('Упс, файла логирования нет. Создадим! ', err.message),
        );

      // запись файла: если на предыдущем шаге данные есть,
      //то к ним сверху добавляем новые из массива, иначе - только новые
      await writeFile(
        this.filename,
        currentFileLog ? `${logData}\n${currentFileLog}` : logData,
      );

      this.emit('messageLogged', logData);

      await this.checkFileSize();

      this.logQueue.length ? await this.writeLog() : (this.writing = false);
    } catch (err) {
      console.error(err);
    }
  }

  async getFileSize() {
    try {
      const stats = await stat(this.filename);
      return stats.size;
    } catch {
      return 0;
    }
  }

  async checkFileSize() {
    const currentSize = await this.getFileSize();

    if (currentSize >= this.maxSize) {
      await this.rotateLog();
    }
  }

  async rotateLog() {
    try {
      await copyFile(this.filename, `${this.filename}.bak`);
      await truncate(this.filename, this.maxSize);
    } catch (err) {
      console.error(err.message);
    }
  }
}

const logger = new Logger('log.txt', 1024);

setTimeout(() => logger.log('Первое сообщение'), 0);
setTimeout(() => logger.log('Второе сообщение'), 500);
setTimeout(() => logger.log('Третье сообщение'), 1000);
setTimeout(() => logger.log('Четвертое сообщение'), 1500);
setTimeout(() => logger.log('Пятое сообщение'), 2000);
setTimeout(() => logger.log('Шестое сообщение'), 2500);

// logger.log('Первое сообщение');
// logger.log('Второе сообщение');
// logger.log('Третье сообщение');
// logger.log('Четвертое сообщение');
// logger.log('Пятое сообщение');
// logger.log('Шестое сообщение');
