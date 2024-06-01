const { Model, DataTypes } = require("sequelize");
const db = require("../db/connection");

class Image extends Model {
    static id;
    static uri;
    static product_id;
}   

Image.init({
    uri: {
        type: DataTypes.STRING,
    },
    product_id: {
        type: DataTypes.INTEGER,
    },
}, {
    sequelize: db,
    modelName: 'Image',

});