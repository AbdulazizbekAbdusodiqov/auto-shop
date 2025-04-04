import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Admin from "./Admin.js";
import Customer from "./Customer.js";

const Ban = sequelize.define("ban", {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    reason :{
        type: DataTypes.STRING,
    }
},{
    freezeTableName : true
})

Admin.hasMany(Ban);
Ban.belongsTo(Admin);

Customer.hasMany(Ban);
Ban.belongsTo(Customer);

export default Ban;