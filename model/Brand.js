import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

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

export default Brand; 