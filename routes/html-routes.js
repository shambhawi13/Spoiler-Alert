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
        res.sendFile(path.join(__dirname, "../public/login.html"));
        //res.render("index", hbsObject);
    });

    // loads dashboard page withlist of items available in refrigerator
    app.get("/dashboard", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/dashboard.html"));
    });

    // shows list of items in fridge
    app.get("/fridge/view", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/view-fridge.html"));
    });

    // edit list of items in fridge
    app.get("/fridge/edit", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/edit-fridge.html"));
    });

    // add items in fridge
    app.get("/fridge/addItem", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/Add-new-item.html"));
    });

    // alert user 
    app.get("/alert", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/alert.html"));
    });

};
