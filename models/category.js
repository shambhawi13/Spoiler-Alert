module.exports = function (sequelize, DataTypes) {
    var Categories = sequelize.define("Categories",
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    len: [1]
                }
            }
        });

    Categories.associate = function (models) {
        // Associating Categories with Refigerator_items
        // When a Category is deleted, also delete any associated Refrigerator_items
        Categories.hasMany(models.Refrigerator_items, {
            onDelete: "cascade"
        });
    };

    return Categories;
};

