const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Customer = sequelize.define("customer",
    {
        id: {
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        first_name : {
            type: DataTypes.STRING(30),
        },
        last_name : {
            type: DataTypes.STRING(30),
        },
        phone_number : {
            type : DataTypes.STRING(15)
        },
        email : {
            type : DataTypes.STRING
        },
        hashed_password : {
            type : DataTypes.STRING
        },
        is_active : {
            type : DataTypes.BOOLEAN
        },
        pasport_seria : {
            type : DataTypes.STRING(9)
        },
        pasport_jshr : {
            type : DataTypes.STRING(16)
        },
        cart : {
            type : DataTypes.STRING(20)
        },
        address : {
            type : DataTypes.STRING
        },
        hashed_refresh_token : {
            type : DataTypes.STRING
        }
    },
    {
        freezeTableName : true
    }
);

module.exports = Customer