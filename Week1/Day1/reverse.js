var myArg = process.argv.splice(2);

for (var i = 0; i < myArg.length; i++){
  var newString = "";

  for (var j = 0; j< myArg[i].length; j++){
    newString = myArg[i].charAt(j) + newString;
  }
  console.log(newString);
}