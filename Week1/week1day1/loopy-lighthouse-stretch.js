loopyLighthouse([15, 90], [2, 5], ["Batty", "Beacon"]);

function loopyLighthouse(range, multiples, words){
  for (var i = range[0]; i <= range [1]; i++){
    var txt = "";
    if (i % multiples[0] === 0){
      txt += words[0];
    }
    if (i % multiples[1] === 0){
      txt += words[1];
    }
    console.log(txt === "" ? i : txt);
  }
}