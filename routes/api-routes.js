// var db = require("../models");

 module.exports = function(app) {
    // create user
    app.post("/api/user", function(req, res) {
        db.Users.create(req.body).then(function(dbUser) {
            console.log(dbUser);
          res.json(dbUser);
        });
      });

    // find users from user table with an id
    app.get("/api/user/:id", function(req, res) {
      let idParam = req.params.id;
      if(idParam){
        db.Users.findAll({
            where: {
                id : idParam
            }
        }).then(function(dbUser) {
            res.json(dbUser);
          });
      }
    });

    // create item table 
    app.post("/api/item", function(req, res) {
        db.Refrigerator_items.create(req.body).then(function(dbItem) {
          res.json(dbItem);
        });
      });

    // create categories
    app.post("/api/categories", function(req, res) {
        db.Categories.create(req.body).then(function(dbUser) {
            console.log(dbUser);
          res.json(dbUser);
        });
      });

    // get all items in Refrigerator_items
    app.get("/api/items", function(req, res) {
        // 1. Add a join to include all of each Author's Posts
        db.Refrigerator_items.findAll({
            include: [db.Categories]
        }).then(function(dbItem) {
          res.json(dbItem);
        });
      });

    // get all categories from Categories table
    app.get("/api/categories", function(req, res) {
        // 1. Add a join to include all of each Author's Posts
        db.Categories.findAll({}).then(function(dbItem) {
          res.json(dbItem);
        });
      });
  
    // update item with particular id
    app.put("/api/item", function(req, res) {
        db.Refrigerator_items.update(
          req.body,
          {
            where: {
              id: req.body.id
            }
          }).then(function(dbItem) {
          res.json(dbItem);
        });
      });
    
    //delete an item from Refrigerator_items
    app.delete("/api/item/:id", function(req, res) {
      db.Refrigerator_items.destroy({
        where: {
          id: req.params.id
        }
      }).then(function(dbItem) {
        res.json(dbItem);
      });
    });
  
   };