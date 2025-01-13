const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Brand = require("./Brand");

const Model =  sequelize.define('model',{
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

module.exports = Model;