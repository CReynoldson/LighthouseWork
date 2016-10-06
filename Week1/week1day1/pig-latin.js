var myArgs = process.argv.slice(2);

var ending = "ay ";
var finalString = "";

for (var i = 0; i < myArgs.length; i++){
  var newString = "";
  var  firstLetter = myArgs[i].charAt(0);
  var word = myArgs[i].substring(1);
  finalString +=  word + firstLetter + ending +  newString ;
}
console.log(finalString);