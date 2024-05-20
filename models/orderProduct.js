const { Model, DataTypes } = require("sequelize");
const db = require("../db/connection");


class OrderProduct extends Model { 
    static id;
    static order_id;
    static product_id;
    static quantity;
}

OrderProduct.init({
    order_id: {
        type: DataTypes.INTEGER,
    },
    product_id: {
        type: DataTypes.INTEGER
    },
    quantity: {
        type: DataTypes.INTEGER
    }
}, {
    sequelize: db,
    modelName: 'OrderProduct',

});

OrderProduct.Order = OrderProduct.belongsTo(require('./order'), {foreignKey: 'order_id'});
OrderProduct.Product = OrderProduct.belongsTo(require('./product'), {foreignKey: 'product_id'});
OrderProduct.prototype.toJSON = function() {
    const orderProduct = this.get();

    delete orderProduct.order_id;
    delete orderProduct.product_id;
    
    orderProduct.order_id = this.getDataValue('order_id');
    orderProduct.product_id = this.getDataValue('product_id');

    return orderProduct;
}
