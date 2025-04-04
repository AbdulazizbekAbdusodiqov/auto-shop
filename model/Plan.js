import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

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

export default Plan;