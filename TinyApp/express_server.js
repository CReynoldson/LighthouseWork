//Declare Dependencies
const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require('bcrypt');
const cookieSession = require("cookie-session");

//Declare Constants
const app = express();
var PORT = process.env.PORT || 8080;
app.set ("view engine", "ejs");
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(cookieSession({
  name: "session",
  keys: ["key1", "key2"]
}));

//Saves all URLs created by all users
const urlDatabase = {};
//Saves user specific information
const users = {};


//"Home" page
app.get("/", (req, res) => {
  if (!req.session.user_id){
    res.redirect("/login");
  } else {
    res.redirect("/urls");
  }
});

// Create new teeny URLS here
app.get("/urls/new", (req, res) => {
  if (!req.session.user_id){
    res.set('Content-Type', 'text/html');
    res.status(401).send("You need to <a href=\"/login\">login</a> to create a teeny URL!");
  }
  let templateVars = { users: users, user_id: req.session.user_id};
  res.status(200).render("urls_new", templateVars);
});

app.get("/login", (req, res) => {
  let templateVars = { users, user_id: req.session.user_id};
  res.render("loginForm", templateVars);
});

//Handle login data
app.post("/login", (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let loginUsername = "";
  let found = false;
  for (var key in users){
    if (users[key].email === email) {
      found = true;
      loginUsername = users[key].id;
    }
  }
  if (!found){
    res.set("Content-Type", "text/html");
    res.status(403).send("Couldn't find your email. BUMMER. \n Try <a href=\"/register\">registering</a> first, maybe.");
  }
  if (!(bcrypt.compareSync(password, users[loginUsername].password))){
    res.status(403).send("You got your password WRONG. Get it toGETHER.");
  }
  req.session.user_id = loginUsername;
  res.redirect("/");
});

//Logout functionality
app.post("/logout", (req, res) => {
  req.session = null;
  res.redirect("/");
});

//Signup form
app.get("/register", (req, res) => {
  if (req.session.user_id){
    res.redirect("/");
  }
  res.render("registrationForm");
});

//Handle Registration Data
app.post("/register", (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  const hashedPassword = bcrypt.hashSync(password, 10);
  if(email.length === 0 || password.length === 0){
    res.status(400).send("You didn't enter anything! What's the deal?");
  }
  for (var key in users){
    if(users[key].email === email){
      res.status(400).send("400!\nThat email is already in the system! Get your own!");
    }
  }
  let user_id = generateRandomString();
  req.session.user_id = user_id; //*****
  users[user_id] = {id: user_id, email: email, password: hashedPassword, urls:{}};
  res.redirect("/");
})

// Checks for a login -- if not logged in, redirects to login page
// Creates teenyURL and redirects to that teenyURL's specific page
app.post("/urls", (req, res) => {
  if (!req.session.user_id){
    res.set('Content-Type', 'text/html');
    res.status(401).send("You need to <a href=\"/login\">login</a> to create a teeny URL!");
  } else {
    let current_user = req.session.user_id;
    let shortURL = generateRandomString();
    users[current_user].urls[shortURL] = req.body.longURL;
    urlDatabase[shortURL] = req.body.longURL;
    res.redirect("/urls/" + shortURL);
  }
});

// Redirects from teenyURL to the corresponding longURL
app.get("/u/:shortURL", (req, res) => {
  if (!urlDatabase[req.params.shortURL]){
    res.status(404).send("I don't know what you're looking for, but this doesn't exist.");
  }
  if (!req.session.user_id){
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
  }
  let current_user = req.session.user_id;
  let longURL = users[current_user].urls[req.params.shortURL];
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
app.get("/urls", (req, res) => {
  if (req.session.user_id){
    let current_user = req.session.user_id;
    let templateVars = { users: users, current_user: current_user, user_id: req.session.user_id, urlDatabase:urlDatabase };
    res.render("urls_index", templateVars);
  } else {
    res.set('Content-Type', 'text/html');
    res.status(401).send("You need to <a href=\"/login\">login</a> to see your teeny URLs!");
  }
});

// Displays specific teenyURL page
app.get("/urls/:id", (req, res) => {
  let current_user = req.session.user_id;
  let shortURL = req.params.id;
  if (!urlDatabase[shortURL]){
    res.status(404).send("I don't know what you're looking for, but this doesn't exist.");
  }
  if (!req.session.user_id){
    res.status(401).send("You need to <a href=\"/login\">login</a> to see your teeny URLs!");
  }
  if (!users[current_user].urls[shortURL]){
    res.status(403).send("That's not your URL! Get your own! \n<a href=\"/urls\">Back to your links</a>");
  }
  let templateVars = { users: users, current_user: current_user, user_id: req.session.user_id,
                      shortURL: req.params.id, longURL:users[current_user].urls[req.params.id],
                        urlDatabase: urlDatabase};
  res.status(200).render("urls_show", templateVars);
});

// Updates user URLS and URLS index page
app.post("/urls/:id", (req, res) => {
  let current_user = req.session.user_id;
  let newLongURL = req.body.longURL;
  if (newLongURL.length === 0){
    res.redirect("/urls");
  } else {
    users[current_user].urls[req.params.id] = newLongURL;
    res.redirect("/urls");
  }
});

// Deletes a url key:value pair from urlDatabase, redirects to url index
app.post("/urls/:id/delete", (req, res) => {
  let current_user = req.session.user_id;
  let deleteProperty = req.params.id;
  delete users[current_user].urls[deleteProperty];
  delete urlDatabase[deleteProperty];
  res.redirect("/urls");
});

// Delivers a .json formatted version of urlDatabase
app.get("/urls.json", (req, res) => {
  let current_user = req.session.user_id;
  res.json(users[current_user]);
});

// Make a port pay attention to you
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!`);
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

