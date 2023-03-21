var fs = require('fs')

var poem_filename="./poem.txt"
var year_filename="./year.txt"

console.log ("Hello NodeJs!");
fs.readFile(poem_filename,"utf-8",(err,data)=>{
	console.log(data);
});
let yearData = fs.readFileSync(year_filename,"utf-8");
console.log(2023 - yearData);
