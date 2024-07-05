const { Model, DataTypes } = require("sequelize");
const db = require("../db/connection");


class Image extends Model {
    static id;
    static uri;
    static product_id;

}   

Image.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    uri: {
        type: DataTypes.STRING,
        allowNull: false
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize: db,
    modelName: 'Image',
});

module.exports = Image;