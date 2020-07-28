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

    return Users;
};

