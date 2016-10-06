var numOfDice = Number(process.argv.slice(2));


if (isNaN(numOfDice)){
  console.log ("Try again");
} else {
  console.log(numOfDice);
}

var outputArray = [];
for (var i = 0; i < numOfDice; i++){
  var dieValue = Math.floor(Math.random() * 6 + 1);
  outputArray.push(dieValue);
}

console.log("Rolled " + numOfDice + " dice: " + (outputArray.join(', ')));