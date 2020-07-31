var bcrypt = require("bcryptjs");

module.exports = function (sequelize, DataTypes) {
    var Users = sequelize.define("Users",
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    len: [1]
                }
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: true,
                }
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    len: [1]
                }
            }
        });

    Users.associate = function (models) {
        // Associating Users with Refigerator_items
        // When a User is deleted, also delete any associated Refrigerator_items
        Users.hasMany(models.Refrigerator_items, {
            onDelete: "cascade"
        });
    };

    Users.prototype.validPassword = function (password) { //object prototype "validPassword"
        return bcrypt.compareSync(password, this.password); //compares the hashed password in our database with the entered password 
    };
    // Hooks are automatic methods that run during various phases of the User Model lifecycle
    // In this case, before a User is created, we will automatically hash their password
    Users.addHook("beforeCreate", function (user) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null); //hashing replaces password values with jumbled characters
    });

    return Users;
};

