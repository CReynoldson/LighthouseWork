var http = require("http");

function readHTML (url, print) {

  var body = "";

  var requestOptions = {
    host: url,
    path: "/"
  };

  http.get(requestOptions, function(response) {
    response.setEncoding("utf8");
    response.on("data", function(data) {
      body += data;
    });
    response.on("end", function() {
      print(body);
    });
  });
}

function printHTML (htmlData) {
  console.log("In printHTML" + htmlData);
}

readHTML("www.example.com", printHTML);