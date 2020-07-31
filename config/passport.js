var passport = require("passport"); //requiring passport
var LocalStrategy = require("passport-local").Strategy; //this is the strategy we're using for passport - for authenticating locally with a username and password.

var db = require("../models");

// Telling passport we want to use a Local Strategy. In other words, we want login with a username/email and password
passport.use(new LocalStrategy(
  // Our user will sign in using an email, rather than a "username"
  {
    usernameField: "email"
  },
  function(email, password, done) { //verify call back required by passport - checking email and password parameters and returning a user when "done"
    // When a user tries to sign in this code runs
    db.Users.findOne({  //searching db for record where email equals the email entered
      where: {
        email: email
      }
    },{raw: true}).then(function(dbUser) {
      // If there's no user with the given email
      if (!dbUser) {
        return done(null, false, { //returns false (i.e. no user)
          message: "Incorrect email." //message returned
        });
      }
      // If there is a user with the given email, but the password the user gives us is incorrect
      else if (!dbUser.validPassword(password)) { //does not have a valid password
        return done(null, false, { //returns false (i.e. no user)
          message: "Incorrect password." //message returned
        });
      }
      // If none of the above, return the user
      return done(null, dbUser); //returns the user
    });
  }
));

// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

// Exporting our configured passport
module.exports = passport;
