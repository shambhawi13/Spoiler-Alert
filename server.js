// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
require('dotenv').config();
var session = require("express-session"); //new
var passport = require("./config/passport"); //new

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Requiring our models for syncing
var db = require("./models");
// for sending mail (nodemailer)
// const sendMail = require("./config/mail");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static("public"));

// new
app.use(session({ secret: process.env.SSC, resave: true, saveUninitialized: true })); //this is the setup to use express session with parameters. 'Secret' is required and a key used for signing and/or encrypting cookies. 'saveUninitialized' allows us to store empty session objects to our session store (i.e. so that we can keep track of unique visitors even if the session object is empty).
app.use(passport.initialize()); //middleware to initialize Passport
app.use(passport.session()); //middleware for apps that use persistent login sessions

// Routes
// =============================================================
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);


// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});

// example for sending mail
// sendMail("qiwei.mod@gmail.com","steak");
