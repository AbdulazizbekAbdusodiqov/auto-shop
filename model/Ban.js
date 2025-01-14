const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Admin = require("./Admin");
const Customer = require("./Customers");

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

module.exports = Ban;