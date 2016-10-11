//Grab necessary modules and commandline arguments
var request = require("request");
var fs = require("fs");


//Main function for accessing Github endpoint
function getRepoContributors(repoOwner, repoName, cb) {

  //Create URL using user input from commandline
  const endpoint = "https://api.github.com/repos/"+repoOwner+"/"+repoName+"/contributors";
  var options = {
    url: endpoint,
    headers: {
      "User-Agent": "request"
    },
    json: true,
  };
  var directory = "./avatars/";
  fs.stat(directory, function (err, stats){
    if(err || !stats.isDirectory()){
      fs.mkdir(directory, function(err) {
        if (err){
          throw err;
        }
        console.log("Directory \'" + directory + "\' created");
      });
    }
  });

  //Request Contributors List
  request(options, function(err, response, body) {
    console.log(directory);
    if (err) {
      throw err;
    }
    //Map each contributor object for the avatar_url and contributor username, send to callback function
    body.map(function(contributorData) {
      var fileName = contributorData.login + ".jpg";
      cb(contributorData.avatar_url, (directory+fileName));
    });
  });
}

//Pipe data from avatar_url to a file directory
function downloadImageByURL(url, filepath) {
  request(url, function (err, response, body) {
    if (err) {
      throw err;
    }
  }).pipe(fs.createWriteStream(filepath));
}

//Get things started
var myArgs = process.argv.slice(2);
getRepoContributors(myArgs[0], myArgs[1], downloadImageByURL);
