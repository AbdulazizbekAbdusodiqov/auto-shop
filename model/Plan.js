const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Plan = sequelize.define("plan", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    month: {
        type: DataTypes.INTEGER,
    },
    markup_rate: {
        type: DataTypes.INTEGER,
    },
}, {
    freezeTableName: true,
});

module.exports = Plan;