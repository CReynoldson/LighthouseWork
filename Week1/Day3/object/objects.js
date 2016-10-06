var arr = [31, 11, 6];

//in objects we can identify values by their meaning / how we describe them
//vs arrays where you identify values by position
//find things using keys

var david = {
  age: 31,
  birthMonth: 11,
  countriesVisited: 6
};

// console.log(david.birthMonth);
david.countriesVisited += 1;
// console.log(david.countriesVisited);

// dealing with dynamically named properties
var prop = process.argv[2];
// console.log(david.prop);
// doesn't work because it's looking for a property on the object that is literally named "prop"
// console.log(david[prop]); // this works because it's calling the string that prop is pointing to
david[prop] += 1;
// console.log(david[prop]);
//think of square brackets like executing a function. you pass a string in as input and what you get back is the output of the function
//

david.coolness = 9001;
david['height'] = '6ft';

// console.log(david);
for (var propName in david) {
  // console.log(propName);
  // console.log(david[propName]);
}

// var arrTest = [0, 1, 2, 3, 4, 5];
// for (var propName in arrTest){
//   console.log(propName);
// }

// accessing nested properties
david.job = {
  role: 'Instructor',
  businessName: 'Lighthouse Labs',
};

// console.log(david.job.role);
//need to start from the object we have a pointer to, then get pointers to the inner object
var davidsJob = david.job; // points to inner object
var davidsBusiness = davidsJob.businessName;
console.log(davidsJob);
console.log(davidsJob.role);
console.log(davidsBusiness);
console.log(typeof davidsBusiness);
console.log(typeof davidsJob);



// passing an object into a function
  // What's the point of a function that doesn't have any return value?
  // If the function has side-effects, then it should have ONLY side-effects
  // If it has a return value then it should have no side-effects

  //When you pass an object into a function you get a pointer to the same object that was passed in (not a duplicate object or anything like that)
function chillOut(notCoolEnoughObject) {
  notCoolEnoughObject.coolness += 1;
}
var previousCoolness = david.coolness;
console.log(david.coolness);
chillOut(david);
console.log(david.coolness);
console.log(previousCoolness);
console.log(previousCoolness !== david.coolness); //shows that it did change by being passed into the function chillOut

// objects with properties whose values are functions
// a "method" is a property on an object whose value is a function
david.isAYoungin = function () {
  return this.age < 45; // will return a boolean
  //what if you want to use this function on another object?
  //the "this" keyword points to the david object
};
var davidIsAYoungin = david.isAYoungin(); //note that you need to use the () still when you invoke the function!!!!
console.log("1", davidIsAYoungin);

var teacher = david;
var result = teacher.isAYoungin();
console.log("2", result);

//anonymous functions - functions without a name

function doesSomething() {
  console.log(this.coolness);
}

david.doSomething = doesSomething;
david.doSomething();

var don = {
  coolness: david.coolness + 10
};

don.doSomething = doesSomething;
don.doSomething();




























