import { EventEmitter } from 'node:events';
import {
  appendFile,
  stat,
  writeFile,
  copyFile,
  truncate,
} from 'node:fs/promises';

class Logger extends EventEmitter {
  constructor(filename, maxSize, init = true) {
    super();
    this.filename = filename; //имя файла лога 'log.txt'
    this.maxSize = maxSize; //макс. размер файла лога в байтах 1024
    this.logQueue = []; //очередь логов
    this.writing = false; //флаг записи
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
      await writeFile(this.filename, '');

      const logData = this.logQueue.join('\n');
      const lastData = this.logQueue[0];
      await appendFile(this.filename, logData);

      this.logQueue = [];

      this.emit('messageLogged', lastData);

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

logger.log('Первое сообщение');
logger.log('Второе сообщение');
logger.log('Третье сообщение');
logger.log('Четвертое сообщение');
logger.log('Пятое сообщение');
logger.log('Шестое сообщение');
