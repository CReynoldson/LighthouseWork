//Declare Dependencies
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const bcrypt = require('bcrypt');
const cookieSession = require("cookie-session");
// const password = "purple-monkey-dinosaur"; // you will probably this from req.params
// const hashed_password = bcrypt.hashSync(password, 10);

//Declare Constants
const app = express();
var PORT = process.env.PORT || 8080; // default port 8080
app.set ("view engine", "ejs");
app.use(cookieParser());      //reads values from cookie
app.use(bodyParser.urlencoded({
  extended: false
}));

const urlDatabase = {};

const users = {};


//"Home" page
app.get("/", (req, res) => {
  let templateVars = { users, user_id: req.cookies["user_id"]};
  res.render("urls_new", templateVars);
})

//Clone of home page
// app.get("/urls/new", (req, res) => {
//   let templateVars = { user_id: req.cookies["user_id"]};
//   res.render("urls_new", templateVars);
// });

app.get("/login", (req, res) => {
  let templateVars = { users, user_id: req.cookies["user_id"]};
  res.render("loginForm", templateVars);
});

//Handle login data
//This could probably be nicer
app.post("/login", (req, res) => {
  console.log("at post login");
  let email = req.body.email;
  let password = req.body.password;
  let user_id = "";
  let found = false;
  for (var key in users){
    if (users[key].email === email) {
      found = true;
      user_id = users[key].id;
    }
  }
  if (!found){
    res.set("Content-Type", "text/html");
    res.status(403).send("Couldn't find your email. BUMMER. \n Try <a href=\"/register\">registering</a> first, maybe.");
  }
  // if (password !== users[user_id].password){
    if (!(bcrypt.compareSync(password, users[user_id].password))){
    res.status(403).send("You got your password WRONG. Get it toGETHER.");
    }
  res.cookie("user_id", user_id);
  res.redirect("/");
});

//Logout functionality
app.post("/logout", (req, res) => {
  res.clearCookie("user_id");
  res.redirect("/");
});

//Signup form
app.get("/register", (req, res) => {
  res.render("registrationForm");
});

//Handle Registration Data
app.post("/register", (req, res) => {
  let email = req.body.email;
  const hashedPassword = bcrypt.hashSync(req.body.password, 5);
  if(email.length === 0 || hashedPassword.length === 0){
    res.status(400).send("You didn't enter anything! What's the deal?");
  }
  for (var key in users){
    if(users[key].email === email){
      console.log("in the if loop");
      res.status(400).send("400!\nThat email is already in the system! Get your own!");
    }
  }
  let user_id = generateRandomString(email);
  res.cookie("user_id", user_id);
  users[user_id] = {id: user_id, email: email, password: hashedPassword, urls:{}};
  console.log(users);
  res.redirect("/");
})

// Checks for a login -- if not logged in, redirects to login page
// Creates teenyURL and redirects to that teenyURL's specific page
app.post("/urls", (req, res) => {
  if (!req.cookies.user_id){
    res.set('Content-Type', 'text/html');
    res.status(401).send("You need to <a href=\"/login\">login</a> to create a teeny URL!");
  } else {
    let current_user = req.cookies.user_id;
    let shortURL = generateRandomString();
    users[current_user].urls[shortURL] = req.body.longURL;
    urlDatabase[shortURL] = req.body.longURL;
    console.log("URL DATABASE: ");
    console.log(urlDatabase);
    console.log("NO LONGER URL DATABASE");
    res.redirect("/urls/" + shortURL);
  }
});

// Redirects from teenyURL to the corresponding longURL
app.get("/u/:shortURL", (req, res) => {
  if (!req.cookies.user_id){
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
  let current_user = req.cookies.user_id;
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
// It's hideous right now and needs formatting ***
app.get("/urls", (req, res) => {
  if (req.cookies.user_id){
    let current_user = req.cookies.user_id;
    let templateVars = { users: users, current_user: current_user, user_id: req.cookies.user_id, urlDatabase:urlDatabase };
    res.render("urls_index", templateVars);
  } else {
    let templateVars = {urlDatabase: urlDatabase};
    res.render("urls_index", templateVars);
  }
});

// Displays specific teenyURL page
app.get("/urls/:id", (req, res) => {
  let current_user = req.cookies.user_id;
  let templateVars = { users: users, current_user: current_user, user_id: req.cookies.user_id,
                      "shortURL": req.params.id, "longURL":users[current_user].urls[req.params.id],
                        urlDatabase:urlDatabase};
  res.render("urls_show", templateVars);
});

// Updates user URLS and URLS index page
app.post("/urls/:id", (req, res) => {
  let current_user = req.cookies.user_id;
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
  let current_user = req.cookies.user_id;
  let deleteProperty = req.params.id;
  delete users[current_user].urls[deleteProperty];
  res.redirect("/urls");
});

// Delivers a .json formatted version of urlDatabase
app.get("/urls.json", (req, res) => {
  let current_user = req.cookies.user_id;
  res.json(users[current_user]);
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

