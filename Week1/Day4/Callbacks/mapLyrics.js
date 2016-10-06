console.log(map(["ground", "control", "to", "major", "tom"], elm));

function map(array, fn){
  var newArray = [];
  for (var element of array){
    newArray.push(fn(element));
  }
  return newArray;
}

function elm(element) {
  return element.length;
}

