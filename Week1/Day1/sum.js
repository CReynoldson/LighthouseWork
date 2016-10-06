var args = process.argv.slice(2);
//console.log(args);

var x = Number(args[0]);
var y = Number(args[1]);

if (x !== Number || y !== Number){
  console.log("Don't try to play me like that. Put in real numbers.");
} else {
  console.log (x + y);
}
