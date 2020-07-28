// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads login/signup page
  app.get("/", function(req, res) {
    //res.sendFile(path.join(__dirname, "../public/blog.html"));
    
    //res.render("index", hbsObject);
  });

  // loads dashboard page withlist of items available in refrigerator
  app.get("/dashboard", function(req, res) {
    
  });

  // shows list of alerts
  app.get("/notification", function(req, res) {
    
  });

  // shows list of user saves recipes
  app.get("/recipes", function(req, res) {
    
  });

};
