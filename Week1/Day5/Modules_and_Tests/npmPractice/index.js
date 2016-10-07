var chalk = require("chalk");

var message = chalk.inverse("Hello World");
var christmas = chalk.red.bgGreen.bold("Merry") + chalk.green.bgRed.italic("Christmas");
var thanksgiving = chalk.cyan.dim("Happy") + chalk.magenta.underline(" Turkey ") + "Day";
var error = chalk.red.bold;
var ghost = chalk.white.bgBlack.inverse;
console.log(ghost("Spooky!"));
console.log(error("Error!"));
console.log(message);
console.log(christmas);
console.log(thanksgiving);