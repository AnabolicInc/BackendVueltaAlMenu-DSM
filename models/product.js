const { Model, DataTypes } = require("sequelize");
const db = require("../db/connection");



class Product extends Model {
    static id;
    static name;
    static price;
    static category_id;
}

Product.init({
    name: {
        type: DataTypes.STRING,
    },
    price: {
        type: DataTypes.INTEGER,
    },
}, {
    sequelize: db,
    modelName: 'Product',

});

Product.Category = Product.belongsTo(require('./category'), {foreignKey: 'category_id'});


module.exports = Product;