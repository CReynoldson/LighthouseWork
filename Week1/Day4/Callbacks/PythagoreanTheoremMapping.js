var input = [
  { x: 3, y: 4 }, //0
  { x: 12, y: 5 }, //1
  { x: 8, y: 15 } //2
];

var result = input.map(function(item){
  var total = 0;
  for (var key in item){
    var a = Math.pow(item[key], 2);
    total += a;
  }
  return Math.sqrt(total);
});

console.log(result[0] === 5);
console.log(result[1] === 13);
console.log(result[2] === 17);

