import { readdir, stat } from 'node:fs/promises';
import { createReadStream, createWriteStream } from 'node:fs';

export const createCommonTextFile = async (path, fileName) => {
  try {
    const filesFromDir = await readdir(path);
    const wStream = createWriteStream(`./${fileName}`);

    filesFromDir.forEach(async file => {
      const currentFilePath = `${path}/${file}`;
      const stats = await stat(currentFilePath);

      if (stats.isDirectory()) {
        //await createCommonTextFile(currentFilePath, fileName);
        console.log('Есть вложенная папуля');
      } else if (stats.isFile() && file.endsWith('txt')) {
        const rStream = createReadStream(currentFilePath);

        for await (const chunk of rStream) {
          wStream.write(`[${file}]\n${chunk}\n`);
        }

        return wStream;
      }
    });
  } catch (err) {
    console.err('Уупс, ошибка: ', err.message);
  }
};
