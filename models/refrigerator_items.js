module.exports = function (sequelize, DataTypes) {
    var Refrigerator_items = sequelize.define("Refrigerator_items", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        date_purchased: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            isDate: true,
        },
        expiration: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            isDate: true,
        },
        quantity: {
            type: DataTypes.DECIMAL,
            allowNull: false,
            isDecimal: true,
        },
        unit_measurement: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        message_sent: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    });

    Refrigerator_items.associate = function (models) {
        // We're saying that a Post should belong to an Author
        // A Post can't be created without an Author due to the foreign key constraint
        Refrigerator_items.belongsTo(models.Users, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    Refrigerator_items.associate = function (models) {
        // We're saying that a Post should belong to an Author
        // A Post can't be created without an Author due to the foreign key constraint
        Refrigerator_items.belongsTo(models.Categories, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Refrigerator_items;
};
