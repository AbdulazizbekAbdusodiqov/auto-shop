import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Car from "./Car.js";
import Plan from "./Plan.js";
import Admin from "./Admin.js";
import Customer from "./Customer.js";


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

Customer.hasMany(Contract)
Contract.belongsTo(Plan)

Admin.hasMany(Contract)
Contract.belongsTo(Admin)

Customer.hasMany(Contract)
Contract.belongsTo(Customer)

export default Contract;