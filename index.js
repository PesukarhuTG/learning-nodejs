import { readdir, mkdir, copyFile, stat } from 'node:fs/promises';

const copyFolder = async (
  sourceDir,
  targetDir,
  cb = (err = null) => {
    if (err) {
      throw new Error('Ууупс, ошибка: ', err.message);
    } else {
      console.log('Копирование завершено');
    }
  },
) => {
  try {
    const files = await readdir(sourceDir);
    await mkdir(`${targetDir}`, { recursive: true });

    files.forEach(async file => {
      const currentFilePath = `${sourceDir}/${file}`;
      const copyFilePath = `${targetDir}/${file}`;

      const stats = await stat(currentFilePath);

      if (stats.isDirectory()) {
        await mkdir(copyFilePath, { recursive: true });
        console.log(`Папка ${file} создана`);
        await copyFolder(currentFilePath, copyFilePath);
      } else if (stats.isFile()) {
        await copyFile(currentFilePath, copyFilePath);
        console.log(`Файл ${file} скопирован`);
      }
    });
  } catch (err) {
    cb(err);
  }
};

copyFolder('./assets/userFiles', './assets/copyUserFiles');

console.log('Запуск приложения');
