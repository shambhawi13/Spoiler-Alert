var db = require("../models");
var moment = require('moment'); // require
var passport = require("../config/passport");
var sendMail = require("../config/mail");

var currentDate = moment().startOf('day').hour(12);

module.exports = function (app) {
    // create user
    // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
    // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
    // otherwise send back an error
    app.post("/api/signup", function (req, res) {
        db.Users.create({
            
            email: req.body.email,
            name : req.body.name,
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
       console.log(req.user);
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
    app.get("/api/items/:id", function (req, res) {
        // 1. Add a join to include all of each Author's Posts
        db.Refrigerator_items.findAll({
            where: {
                UserId: req.params.id
              },
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
    app.put("/api/item/", function (req, res) {
        console.log(req.body);
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

    //delete all items from Refrigerator_items
    app.delete("/api/item/deleteAll/:userid", function (req, res) {
        db.Refrigerator_items.destroy({
            where: {
                UserId: req.params.userid
            }
        }).then(function (dbItem) {
            res.json(dbItem);
        });
    });

    app.get("/api/runScheduler", function (req, res) {
        // create variable to filter expired item corresponding to each user
        let expDetail = {};
        db.Users.findAll({
            raw: true
        }).then(function (user) {
            //console.log(user);
            for(let i of user){
                expDetail[i.id] = {};
                expDetail[i.id].email = i.email;
                expDetail[i.id].items = [];
            }
            //console.log(expDetail);
            // 1. get all items from refrigerator
            db.Refrigerator_items.findAll({
                raw: true
            }).then(function (dbItem) {
                //console.log(dbItem)
                for(let i of dbItem){
                    var expirationFormatted = moment(i.expiration + "T12:00:00");
                    //console.log(expirationFormatted.diff(currentDate, 'days'),'>>>',currentDate,'>>>',expirationFormatted); 
                    let diffInDays = expirationFormatted.diff(currentDate, 'days');
                    if(!i.expiration_sent && diffInDays<2){
                        expDetail[i.UserId].items.push(i.name);
                        // todo update the expiration_sent to true
                        db.Refrigerator_items.update(
                            {expiration_sent: true},
                            {where: {id: i.id} }
                          )
                          .then(function(result) {
                            console.log('Updated : ',i.id, result);
                          })

                    } 
                }
                for(let i in expDetail){
                    //console.log(i,expDetail[i]);
                    sendMail(expDetail[i].email,expDetail[i].items);
                }
            });
        })

    });

};