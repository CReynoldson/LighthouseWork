var x = 5;

console.log(x);

scoping(x);

function scoping(x){
  console.log("First scoping:", x);
  x = 18;
  console.log("Second scoping", x);
}

console.log (x);