import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Customer from "./Customer.js";
import Contract from "./Contract.js";

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

export default Payment;