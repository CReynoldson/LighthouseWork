var numbers = process.argv.slice(2);


var total = 0;
debugger;
for (var i = 0; i < numbers.length; i++) {
  total += Number(numbers[i]);
}

console.log(total);