// Refactoring = changing the code w/o changing what it does

// String
var name = 'david';
var es = '';


// Number
var a = 42;
var t = 1;
var f = 0;
var nana = NaN;
// console.log(typeof(nana));
var inf = Infinity;
var negZ = -0;

var stuckTogether = a + "david";
// console.log(stuckTogether);

// Boolean
var tr = true;
var fls = false;
var typeofTr = typeof tr;
// console.log(typeofTr);
// console.log(typeof(typeofTr)); //string

// Null
var n = null;

// Undefined
var u;
var u = undefined;
// console.log(typeof u);

function myFunk(){};
// console.log(typeof myFunk); -- function
function myFunk2(){};
// console.log(myFunk2 === myFunk); -- function


var array = [];
// console.log(typeof array); -- object

// Object
var teacher = {
  name: 'David'
};

var teacher2 = {
  name:'David'
};
teacher2.name = "Don";
// console.log(teacher2.name);
teacher2.name = "Corky";
// console.log(teacher2.name);
var teacher2point0 = teacher2;
// console.log(teacher2 === teacher2point0);
console.log(teacher2point0.name);

var sameTeacher = teacher === teacher2;
console.log(sameTeacher);

var b = 41;
b = b + 1;
var sameNumber = a === b;
// console.log(sameNumber);
