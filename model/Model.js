import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Brand from "./Brand.js";

const Model = sequelize.define('model',{
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

Brand.hasMany(Model);
Model.belongsTo(Brand);

export default Model;