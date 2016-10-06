// forEach was designed to iterate over every single element in an array

var list = ['Apples', 'Bananas', 'Tofu', 'Carbs', 'Avocado', 'NOT THE BEANS'];

// list.forEach(function(item, index, array){
//   console.log("array is ", array);
//   console.log(item[0], index);
// })

/*var printFirstLetter = function(item, index, array){
  console.log("array is ", array);
  console.log(item[0], index);
}

list.forEach(printFirstLetter);*/

// when you need to put a parameter in that you aren't going to use(because order matters) use an underscore
// to show that it's just a placeholder
// eg. if you want item and array but not index, write
// var printFirstLetter = function(item, _index, array){


// -----------------------------------------------------------------------------//

// map is a higher order function that:
// takes in an array,
// applies a transformation (a callback)
// returns another array with the transformation applied to all elements

var names = ["bob", "anna", "don", "david"];
// We want the names to have uppercase first letters because proper grammar
var upcaseNames = names.map(function(item){
  // return "Hello"
  // item.charAt(0).toUpperCase();
  return item + "!"; // produces a new array, DOES NOT overwrite original array elements. New array gets name of var (in this case, upcaseNames)
})

console.log("upcaseNames ", upcaseNames);

// -----------------------------------------------------------------------------//

// find is a higher order function that is designed to
// look through every item in an array and find the item
// that matches a condition in the callback

var list = ["Apples", "Feta Cheese", "Avocado", "Milk", "Tomatoes", "Hummus"];

// Task: find the first item in the list that starts with A
var itemWithA;

list.forEach(function(item){
  if (typeof itemWithA === "undefined" && item.startsWith("A")){
    itemWithA = item;
    return;
  }
});
//this return avocado instead of apples
//you can't exit early out of a forEach -- each element has its own callback stuck in it
//so the return just moves onto the next item in the list, instead of exiting out of the loop itself
console.log(itemWithA);

// -----------------------------------------------------------------------------//

list.find(function(item){
  // if you return true out of the callback, the item is the one that you're looking for
  //if you return false or anything else, find keeps going and trying to find your callback
  return item.startsWith("A");
});
console.log(itemWithA);





















