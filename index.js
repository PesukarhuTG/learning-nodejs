//4 тк этап check 1й по порядку
setImmediate(() => {
  console.log('Был диван,');
});

//8 тк сработал таймер с задержкой на 10
setTimeout(() => {
  console.log('Выйди вон!');
}, 10);

//5 тк этап check 2й по порядку
setImmediate(() => {
  console.log('На диване');
});

//2 тк микротаска 1я в стеке операций
process.nextTick(() => {
  console.log('Чемодан,');
});

//7 тк сработал первый заершенный таймер с 0 задержкой
setTimeout(() => {
  console.log('Кто не верит –');
}, 0);

//6 тк этап check 3й по порядку
setImmediate(() => {
  console.log('Ехал слон.');
});

//3 тк микротаска 2я в стеке операций
process.nextTick(() => {
  console.log('В чемодане');
});

// 1 тк синхронная операция
console.log('Плыл по морю');
