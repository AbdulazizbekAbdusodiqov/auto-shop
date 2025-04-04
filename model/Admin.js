import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Admin = sequelize.define("admin",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        first_name: {
            type: DataTypes.STRING(30),
        },
        last_name: {
            type: DataTypes.STRING(30),
        },
        phone_number: {
            type: DataTypes.STRING(15)
        },
        email: {
            type: DataTypes.STRING
        },
        hashed_password: {
            type: DataTypes.STRING
        },
        is_creator: {
            type: DataTypes.BOOLEAN
        },
        is_active: {
            type: DataTypes.BOOLEAN
        },
        activation_link: {
            type : DataTypes.UUID
        },
        hashed_refresh_token: {
            type: DataTypes.STRING
        }
    },
    {
        freezeTableName: true
    }
);

export default Admin