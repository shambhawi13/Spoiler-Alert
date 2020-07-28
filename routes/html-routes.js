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

  // index route loads view.html
  app.get("/", function(req, res) {
    //res.sendFile(path.join(__dirname, "../public/blog.html"));
  });

  // cms route loads cms.html
  app.get("/dashboard", function(req, res) {
    
  });

  // blog route loads blog.html
  app.get("/notification", function(req, res) {
    
  });

  // authors route loads author-manager.html
  app.get("/recipes", function(req, res) {
    
  });

};
