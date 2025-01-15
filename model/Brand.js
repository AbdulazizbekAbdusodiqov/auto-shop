const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Brand = sequelize.define('brand',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.STRING,
    }
},{
    freezeTableName: true
});

module.exports = Brand; 