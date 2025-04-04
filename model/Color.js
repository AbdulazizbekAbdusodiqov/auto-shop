import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

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

export default Color; 