var myArgs = require('optimist').argv,
  help = 'This would be a great place for real help informaiton.';

if ((myArgs.h) || (myArgs.help)){
  console.log(help);
  process.exit(0);
}

switch (myArgs._[0]) {
  case 'insult':
    console.log(myArgs.n || myArgs.name, 'smells quite badly.');
    break;
  case 'compliment':
    console.log(myArgs.n || myArgs.name, 'is really cool.');
    break;
  default:
    console.log(help);
}

//console.log('myArgs ', myArgs);