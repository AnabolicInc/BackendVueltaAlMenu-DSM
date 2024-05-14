const { Model, DataTypes } = require("sequelize");
const db = require("../db/connection");


class ResetPassword extends Model {
    static id;
    static email;
    static token;
    static status;
}

ResetPassword.init({
    email: {
        type: DataTypes.STRING,
    },
    token: {
        type: DataTypes.STRING,
    },
    status: {
        type: DataTypes.BOOLEAN,
    },
}, {
    sequelize: db,
    modelName: 'ResetPassword',

});

ResetPassword.User = ResetPassword.belongsTo(require('./user'), {foreignKey: 'user_id'});

export default ResetPassword;