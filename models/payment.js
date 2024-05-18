const { Model, DataTypes } = require("sequelize");
const db = require("../db/connection");

class Payment extends Model {
    static id;
    static holder_name;
    static card_number;
    static expiration_date;
    static cvc;
    static session_token;
    static cuotes;
    static type;
}

Payment.init({
    holder_name: {
        type: DataTypes.STRING,
    },
    card_number: {
        type: DataTypes.STRING
    },
    expiration_date: {
        type: DataTypes.STRING
    },
    cvc: {
        type: DataTypes.INTEGER
    },
    session_token: {
        type: DataTypes.STRING
    },
    cuotes: {
        type: DataTypes.INTEGER
    },
    type: {
        type: DataTypes.STRING
    },
}, {
    sequelize: db,
    modelName: 'Payment',

});

Payment.User = Payment.belongsTo(require('./user'), {foreignKey: 'user_id'});
Payment.Order = Payment.belongsTo(require('./order'), {foreignKey: 'order_id'});

Payment.prototype.toJSON = function() {
    const payment = this.get();

    delete payment.card_number;
    delete payment.expiration_date;
    delete payment.cvc;
    delete payment.session_token;
    delete payment.cuotes;
    delete payment.type;
    delete payment.user_id;
    delete payment.order_id;
    
    payment.user_id = this.getDataValue('user_id');
    payment.order_id = this.getDataValue('order_id');

    return payment;
}

module.exports = Payment;