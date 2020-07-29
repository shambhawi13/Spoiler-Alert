var db = require("../models");
var moment = require('moment'); // require
var passport = require("../config/passport");

module.exports = function (app) {
    // create user
    // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
    // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
    // otherwise send back an error
    app.post("/api/signup", function (req, res) {
        db.User.create({
            email: req.body.email,
            password: req.body.password
        })
            .then(function () {
                res.redirect(307, "/api/login");
            })
            .catch(function (err) {
                res.status(401).json(err);
            });
    });

    // Using the passport.authenticate middleware with our local strategy.
    // If the user has valid login credentials, send them to the members page.
    // Otherwise the user will be sent an error
    app.post("/api/login", passport.authenticate("local"), function (req, res) {
        res.json(req.user);
    });

    // Route for logging user out
    app.get("/logout", function (req, res) {
        req.logout();
        res.redirect("/");
    });

    // create item table 
    app.post("/api/item", function (req, res) {
        db.Refrigerator_items.create(req.body).then(function (dbItem) {
            res.json(dbItem);
        });
    });

    // create categories
    app.post("/api/categories", function (req, res) {
        db.Categories.create(req.body).then(function (dbUser) {
            console.log(dbUser);
            res.json(dbUser);
        });
    });

    // get all items in Refrigerator_items
    app.get("/api/items", function (req, res) {
        // 1. Add a join to include all of each Author's Posts
        db.Refrigerator_items.findAll({
            include: [db.Categories]
        }).then(function (dbItem) {
            res.json(dbItem);
        });
    });

    // get all categories from Categories table
    app.get("/api/categories", function (req, res) {
        // 1. Add a join to include all of each Author's Posts
        db.Categories.findAll({}).then(function (dbItem) {
            res.json(dbItem);
        });
    });

    // update item with particular id
    app.put("/api/item", function (req, res) {
        db.Refrigerator_items.update(
            req.body,
            {
                where: {
                    id: req.body.id
                }
            }).then(function (dbItem) {
                res.json(dbItem);
            });
    });

    //delete an item from Refrigerator_items
    app.delete("/api/item/:id", function (req, res) {
        db.Refrigerator_items.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (dbItem) {
            res.json(dbItem);
        });
    });

    app.get("/api/runScheduler", function (req, res) {
        // create variable to filter expired item corresponding to each user
        let expDetail = {};
        db.Users.findAll({}).then(function (user) {
            // 1. get all items from refrigerator
            db.Refrigerator_items.findAll({}).then(function (dbItem) {
                res.json(dbItem);
            });
        })

    });

};