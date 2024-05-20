const { Model, DataTypes } = require("sequelize");
const db = require("../db/connection");



class Product extends Model {
    static id;
    static name;
    static price;
    static description;
    static quantity;
    static status;
    static category_id;
}

Product.init({
    name: {
        type: DataTypes.STRING,
    },
    price: {
        type: DataTypes.INTEGER,
    },
    description: {
        type: DataTypes.STRING,
    },
    quantity: {
        type: DataTypes.INTEGER,
    },
    status: {
        type: DataTypes.BOOLEAN,
    },
}, {
    sequelize: db,
    modelName: 'Product',

});

Product.Category = Product.belongsTo(require('./category'), {foreignKey: 'category_id'});


module.exports = Product;