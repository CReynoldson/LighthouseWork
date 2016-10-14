//Declare Dependencies
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

//Declare Constants
const app = express();
var PORT = process.env.PORT || 8080; // default port 8080
app.set ("view engine", "ejs");
app.use(cookieParser());      //reads values from cookie
app.use(bodyParser.urlencoded({
  extended: false
}));

const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

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
  res.render("loginForm")
});

//Handle login data
app.post("/login", (req, res) => {
  console.log("at post login");
  let email = req.body.email;
  let password = req.body.password;
  let user_id = "";
  let found = false;
  for (var key in users){
    if (users[key].email === email) {
      found = true;
      user_id = [key];
    }
  }
  console.log(user_id);
  if (!found){
    res.status(403).send("Couldn't find your email. BUMMER.");
  }
  if (password !== users[user_id].password){
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
  let password = req.body.password;
  if(email.length === 0 || password.length === 0){
    res.status(400).send("You didn't enter anything! What's the deal?");
  }
  for (var key in users){
    console.log("in the for loop");
    console.log(`${key} ${users[key].email}`);
    if(users[key].email === email){
      console.log("in the if loop");
      res.status(400).send("400!\nThat email is already in the system!");
    }
  }
  let user_id = generateRandomString(email);
  let user_password = generateRandomString(password);
  // console.log(`${user_id}, ${user_password}`);
  res.cookie("user_id", user_id);
  users[user_id] = {id: user_id, email: email, password: password};
  console.log(users);
  res.redirect("/");

})

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
  let templateVars = { users, "user_id": req.cookies["user_id"], urls: urlDatabase };
  res.render("urls_index", templateVars);
});

// Displays specific teenyURL page
app.get("/urls/:id", (req, res) => {
  let templateVars = { users, "user_id": req.cookies["user_id"], "shortURL": req.params.id, "longURL":urlDatabase[req.params.id] };
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

