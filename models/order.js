const { Model, DataTypes } = require("sequelize");
const db = require("../db/connection");


class Order extends Model { 
    static id;
    static user_id;
    static status;
    static payment_id;
    static date;
    static total;
}

Order.init({
    user_id: {
        type: DataTypes.INTEGER,
    },
    status: {
        type: DataTypes.STRING
    },
    payment_id: {
        type: DataTypes.INTEGER
    },
    date: {
        type: DataTypes.DATE
    },
    total: {
        type: DataTypes.DECIMAL
    }
}, {
    sequelize: db,
    modelName: 'Order',

});

Order.User = Order.belongsTo(require('./user'), {foreignKey: 'user_id'});
Order.Payment = Order.belongsTo(require('./payment'), {foreignKey: 'payment_id'});
Order.OrderProduct = Order.hasMany(require('./orderProduct'), {foreignKey: 'order_id'});
Order.prototype.toJSON = function() {
    const order = this.get();

    delete order.user_id;
    delete order.payment_id;
    
    order.user_id = this.getDataValue('user_id');
    order.payment_id = this.getDataValue('payment_id');

    return order;
}
