// -----------------------------------------------------------------------------//
// Let's implement our own map using a for-loop

function myMap(list, callback) {
  // return a copy of the list where all elements have been modified with callback
  var listCopy = [];
  list.forEach(function(item){
    // 1. apply callback to get transformation
    var transformedItem = callback(item); //the callback is a function here, so you can call it and pass in the item. It runs the function on line 17
    // 2. push newly transformed value into the copied list
    listCopy.push(transformedItem);
  });
  return listCopy;
}

var names = ["bob", "anna", "don", "david"];

var upcaseNames = myMap(names, function(item){
  return item + " is rad af";
});

console.log("upcaseNames ", upcaseNames);