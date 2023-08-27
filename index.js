
const { getFullUserData } = require('mpackage');

const userData = {
  name: 'максим лескин',
  dateBirth: '10.03.1987',
  purpose: 'карьерный рост'
}

console.log(getFullUserData(userData));