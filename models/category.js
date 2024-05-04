const { Model, DataTypes } = require("sequelize");
const db = require("../db/connection");



class Category extends Model {
    static id;
    static name;
    static description;
    static image;
    static status;
}

Category.init({
    name: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.STRING
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    status: {
        type: DataTypes.BOOLEAN,
    },
}, {
    sequelize: db,
    modelName: 'Category',

});


module.exports = Category;