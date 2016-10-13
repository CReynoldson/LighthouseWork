//Declare Dependencies
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

//Declare Constants
var PORT = process.env.PORT || 8080; // default port 8080
app.set ("view engine", "ejs");
app.use(bodyParser.urlencoded({
  extended: false
}));

var urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

//"Home" page
app.get("/", (req, res) => {
  res.render("urls_new");
})

//Clone of home page
app.get("/urls/new", (req, res) => {
  res.render("urls_new");
});

// Creates teenyURL and redirects to that teenyURL's specific page
app.post("/urls", (req, res) => {
  let shortURL = generateRandomString();
  urlDatabase[shortURL] = req.body.longURL;
  res.redirect("/urls/" + shortURL);
});

// Redirects from teenyURL to the corresponding longURL
app.get("/u/:shortURL", (req, res) => {
  let longURL = urlDatabase[req.params.shortURL];
  if(longURL.substring(0, 8) === "https://"){
    longURL = longURL.substring(8);
    res.redirect("http://" + longURL);
  } else if (longURL.substring(0, 7) === "http://") {
    longURL = longURL.substring(7);
    res.redirect("http://" + longURL);
  } else {
    res.redirect("http://" + longURL);
  }
});

// Displays urls index
// It's hideous right now and needs formatting ***
app.get("/urls", (req, res) => {
  let templateVars = { urls: urlDatabase };
  res.render("urls_index", templateVars);
});

// Displays specific teenyURL page
app.get("/urls/:id", (req, res) => {
  let templateVars = { "shortURL": req.params.id, "longURL":urlDatabase[req.params.id] };
  res.render("urls_show", templateVars);
});

// Updates urlDatabase and urls index
app.post("/urls/:id", (req, res) => {
  let newLongURL = req.body.longURL;
  if (newLongURL.length === 0){
    res.redirect("/urls");
  } else {
    urlDatabase[req.params.id] = newLongURL;
    res.redirect("/urls");
  }
});

// Deletes a url key:value pair from urlDatabase, redirects to url index
app.post("/urls/:id/delete", (req, res) => {
  let deleteProperty = req.params.id;
  delete urlDatabase[deleteProperty];
  res.redirect("/urls");
});

// Delivers a .json formatted version of urlDatabase
app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);
});

// Make a port pay attention to you
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

// Creates a random 6 character long string to act as a teenyURL
function generateRandomString() {
  let charset = "abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let stringLength = 6;
  let randomString = "";
  for (var i = 0; i < stringLength; i++){
    randomString += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return randomString;
}

