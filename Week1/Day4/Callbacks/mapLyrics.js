console.log(map(["ground", "control", "to", "major", "tom"], function elm
  (element){return element.length}));

function map(array, fn)
{
  var newArray = [];
  for (var element of array){
    newArray.push(fn(element));
  }
  return newArray;
}



