const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Car = require("./Car");
const Plan = require("./Plan");
const Admin = require("./Admin");
const Customer = require("./Customer");


const Contract = sequelize.define("contract", {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    is_active:{
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    term:{
        type: DataTypes.DATE,
    },
    first_payment:{
        type: DataTypes.DECIMAL(10,2),
    },
    month_day:{
        type: DataTypes.INTEGER,
    },
    monthly_payment:{
        type: DataTypes.DECIMAL(10,2),
    },
    total_price:{
        type: DataTypes.DECIMAL(10,2),
    }
},{
    freezeTableName: true,
})

Car.hasMany(Contract)
Contract.belongsTo(Car)

Plan.hasMany(Contract)
Contract.belongsTo(Plan)

Admin.hasMany(Contract)
Contract.belongsTo(Admin)

Customer.hasMany(Contract)
Contract.belongsTo(Customer)

module.exports = Contract;