const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Customer = require("./Customers");
const Contract = require("./Contract");

const Payment = sequelize.define("payment",{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    amount:{
        type: DataTypes.DECIMAL(10,2),
    },
    payment_date:{
        type: DataTypes.DATE,
    },
    status:{
        type: DataTypes.ENUM("Paid", "Pending"),
        defaultValue: "Pending" 
    },
    payment_method:{
        type: DataTypes.ENUM("Credit Card", "Cash")
    }
},{
    freezeTableName: true,
});

Contract.hasMany(Payment);
Payment.belongsTo(Contract);

Customer.hasMany(Payment);
Payment.belongsTo(Customer);

module.exports = Payment;