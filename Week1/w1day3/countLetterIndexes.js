function countIndexes(words){
  var letters = words.split("");
  var letterObject = {};

  for (var i = 0; i < letters.length; i++){
    var x = letters[i];
    var index = i;
    if (x === ' '){
      continue;
    } else if (letterObject[x] === undefined){
      letterObject[x] = index.toString();
    } else {
      letterObject[x] += " ";
      letterObject[x] += index.toString();
    }
  }
  return letterObject;
};

console.log(countIndexes("lighthouse in the house"));

NOTICE ME