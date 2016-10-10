var request = require("request");

function readHTML(url, print){
  request(url, function(err, response, body){
    if (err) {
      throw err;
    }
    print(body);
  });
}

function printHTML(HTMLData){
  console.log(HTMLData)
}

readHTML("http://www.example.com", printHTML);

