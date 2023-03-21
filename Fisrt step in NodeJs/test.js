//const fs = require('fs');

var poem_filename="./poem.txt"
var year_filename="./year.txt"

//console.log('Hello Node.js!');

//fs.readFile('poem.txt', 'utf-8', (err, data) => {
//if (err) throw err;
//console.log(data);
//});

//fs.readFile('year.txt', 'utf-8', (err, data) => {
//if (err) throw err;
//console.log('2023 -', data);
//});


//Merlin Says:


const fs = require('fs');

console.log('Hello Node.js!');

fs.readFile(year_filename, 'utf-8', (err, data) => {
console.log(`2023 - ${data}`);
});

fs.readFile(poem_filename, 'utf-8', (err, data) => {
console.log(data);
});