var request = require("request");
var fs = require("fs");
var myArgs = process.argv.slice(2);

function getRepoContributors(repoOwner, repoName, cb) {

  const endpoint = "https://api.github.com/repos/"+repoOwner+"/"+repoName+"/contributors?access_token=9455c1402a42a3147fe98138b1fae2cb1337f033";
  var options = {
    url: endpoint,
    headers: {
      "User-Agent": "request"
    },
    json: true,
  };

  request(options, function(err, response, body){
    if (err){
      throw err;
    }
    cb(options, "tmp");
  });
}

function downloadImageByURL(url, filepath){
  request(url, function (err, response, body){
    if (err){
      throw err;
    }
    var urlArray = body.map(function(element, index, _array){
      return element.avatar_url;
    });
    urlArray.forEach(function(element, index, _array){
      var fileName = filepath + "/" + index + ".jpg";
      request(element, function(err, response, body){
        if (err){
          throw err;
        }
      }).pipe(fs.createWriteStream(fileName));
    });
  });
}

getRepoContributors(myArgs[0], myArgs[1], downloadImageByURL);
