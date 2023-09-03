const textToBuffer = (text, encoding) => Buffer.from(text, encoding);
const bufferToText = (buffer, encoding) => buffer.toString(encoding);

const text = 'Привет, мир!';
const utf8Buffer = textToBuffer(text, 'utf8');

// ТЗ: ПЕРЕВЕДИТЕ ТЕКСТ ИЗ UTF-8 В BASE64 И ОБРАТНО.
const decodedBase64 = bufferToText(utf8Buffer, 'base64');

const base64Buffer = textToBuffer(decodedBase64, 'base64');
const decodedText = bufferToText(base64Buffer, 'utf8');

console.log('utf8Buffer: ', utf8Buffer);
console.log('decodedText: ', decodedText);

console.log(`Сравним буферы utf8 и base64: ${utf8Buffer.equals(base64Buffer)}`);

// ДЛЯ СЕБЯ: ПЕРЕВЕДИТЕ ТЕКСТ ИЗ UTF-8 В HEX И ОБРАТНО.
/*const decodedHex = bufferToText(utf8Buffer, 'hex');

const hexBuffer = textToBuffer(decodedHex, 'hex');
const decodedText = bufferToText(hexBuffer, 'utf8');

console.log('utf8Buffer: ', utf8Buffer);
console.log('decodedText: ', decodedText);

console.log(`Сравним буферы utf8 и hex: ${utf8Buffer.equals(hexBuffer)}`);
*/

// ДЛЯ СЕБЯ: ПЕРЕВЕДИТЕ ТЕКСТ ИЗ UTF-8 В LATIN1 И ОБРАТНО.
/*const decodedLatin1 = bufferToText(utf8Buffer, 'latin1');

const latin1Buffer = textToBuffer(decodedLatin1, 'latin1');
const decodedText = bufferToText(latin1Buffer, 'utf8');

console.log('utf8Buffer: ', utf8Buffer);
console.log('decodedText: ', decodedText);

console.log(`Сравним буферы utf8 и latin: ${utf8Buffer.equals(latin1Buffer)}`);
*/
