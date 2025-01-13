const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Color = sequelize.define('color',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
    }
},{
    freezeTableName: true
});

module.exports = Color; 