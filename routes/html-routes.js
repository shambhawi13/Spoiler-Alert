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

    app.get("/", function (req, res) {
        // If the user already has an account send them to the members page
        if (req.user) {
            res.redirect("/dashboard");
        }
        res.sendFile(path.join(__dirname, "../public/signup.html"));
    });

    app.get("/login", function (req, res) {
        // If the user already has an account send them to the members page
        if (req.user) {
            res.redirect("/dashboard");
        }
        res.sendFile(path.join(__dirname, "../public/login.html"));
    });

    // loads dashboard page withlist of items available in refrigerator
    app.get("/dashboard",isAuthenticated, function (req, res) {
        res.sendFile(path.join(__dirname, "../public/dashboard.html"));
    });

    // shows list of items in fridge
    app.get("/fridge/view",isAuthenticated, function (req, res) {
        res.sendFile(path.join(__dirname, "../public/view-fridge.html"));
    });

    // edit list of items in fridge
    app.get("/fridge/edit", isAuthenticated, function (req, res) {
        res.sendFile(path.join(__dirname, "../public/edit-fridge.html"));
    });

    // add items in fridge
    app.get("/fridge/addItem", isAuthenticated, function (req, res) {
        res.sendFile(path.join(__dirname, "../public/Add-new-item.html"));
    });

    // alert user 
    app.get("/alert", isAuthenticated, function (req, res) {
        res.sendFile(path.join(__dirname, "../public/alert.html"));
    });

};
