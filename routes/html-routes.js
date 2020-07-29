// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function (app) {

    // Each of the below routes just handles the HTML page that the user gets sent to.

    // index route loads login/signup page
    app.get("/", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/test.html"));
        //res.render("index", hbsObject);
    });

    // loads dashboard page withlist of items available in refrigerator
    app.get("/dashboard", function (req, res) {

    });

    // shows list of items in fridge
    app.get("/fridge/view", function (req, res) {

    });

    // edit list of items in fridge
    app.get("/fridge/edit", function (req, res) {

    });

    // add items in fridge
    app.get("/fridge/addItem", function (req, res) {

    });

    // alert user 
    app.get("/alert", function (req, res) {

    });

};
