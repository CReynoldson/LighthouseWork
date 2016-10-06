var myArg = process.argv.slice(2);
console.log(obfuscate(myArg[0]));

function obfuscate(password) {
  var newPass = "";
  for (var i = 0; i < password.length; i++){
    switch (password.charAt(i).toLowerCase()) {
      case 'a':
        newPass += '4';
        break;
      case 'e':
        newPass += '3';
        break;
      case 'o':
        newPass += '0';
        break;
      case 'l':
        newPass += '1';
        break;
      default:
        newPass += password.charAt(i);
    }
  }
  return newPass;
}