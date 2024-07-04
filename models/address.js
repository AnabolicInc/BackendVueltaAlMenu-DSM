const { Model, DataTypes } = require("sequelize");
const db = require("../db/connection");

class Address extends Model {
    static id;
    static address;
    static neighborhood;
    static latitude;
    static longitude;
    static user_id;
}

Address.init({
    address: {
        type: DataTypes.STRING,
    },
    neighborhood: {
        type: DataTypes.STRING
    },
    latitude: {
        type: DataTypes.INTEGER
    },
    longitude: {
        type: DataTypes.INTEGER
    },
}, {
    sequelize: db,
    modelName: 'Address',
});

Address.User = Address.belongsTo(require('./user'), {foreignKey: 'userId'});

module.exports = Address;