var x = module.exports = {
  fun: function sayHello(name) {
    var result = addName(name) + "!";
    // console.log(result);
    return result;
    }
};

function addName (name) {
  var greeting = ("Hello " + name);
  return greeting;
}