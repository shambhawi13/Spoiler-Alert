var db = require("../models");

module.exports = function(app) {
    // create user
    app.post("/api/user", function(req, res) {
        db.User.create(req.body).then(function(dbUser) {
          res.json(dbUser);
        });
      });

    // find users from user table with an id
    app.get("/api/user/:id", function(req, res) {
      let idParam = req.params.id;
      if(idParam){
        db.User.findAll({
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
        db.User.create(req.body).then(function(dbItem) {
          res.json(dbItem);
        });
      });

    // get all items in refrigerator
    app.get("/api/items", function(req, res) {
        // 1. Add a join to include all of each Author's Posts
        db.Refrigerator.findAll({}).then(function(dbItem) {
          res.json(dbItem);
        });
      });
  
    // update item with particular id
    app.put("/api/item", function(req, res) {
        db.Refrigerator.update(
          req.body,
          {
            where: {
              id: req.body.id
            }
          }).then(function(dbItem) {
          res.json(dbItem);
        });
      });
    
    //delete an item from refrigerator
    app.delete("/api/item/:id", function(req, res) {
      db.Refrigerator.destroy({
        where: {
          id: req.params.id
        }
      }).then(function(dbItem) {
        res.json(dbItem);
      });
    });
  
  };