// function can be assigned to a variable

// var keywords (even for functions) get hoisted to the top when javascript reads over the program
// var sayHello; -- vars remain undefined until it is reached and defined within the program
// var say Konichiwa;
// function excited -- this is defined right away
// var keyword =  expressive function, function keyword = declarative function


var sayHello = function(name){ //can pass the function around as a variable
  return "Hello " + name;
}

console.log(sayHello("Bob"));

function excited(punctuation, greeterFunction){
  console.log(greeterFunction("Anna") + punctuation);
}

excited("!!!", sayHello);

var sayKonichiwa = function (name) {
  return "Konichiwa " + name;
}

excited("!!!!!!!!", sayKonichiwa);


// function foo(){
//   function bar(){
//     return 3;
//   }
//   function bar() {
//     return 8;
//   }
//   return bar();
// }
// console.log(foo());

// A test! Which is hoisted first?
//  functional declarations
//  variables

// foo();
// function foo(){
//   console.log("foo says: ", name);
// }
// var name = "hello";
// if var is hoisted higher we get undefined, if lower we get an error saying it's undeclared


function foo(callback){
  console.log("foo says " + callback());
}

foo(function someName(){ //declares an anonymous function. Best practice seems to be giving functions
  asdfjoij                // a name for stack trace debugging, but you can also use line numbers
  return "hello";
});

// function returnsHello(){
//   asdfrioj
//   return "hello";
// }
// foo(returnsHello());































