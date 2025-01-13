const { Sequelize } = require("sequelize");
const config = require("config")


const sequelize = new Sequelize(
    config.get("db_name"),
    config.get("db_username"),
    config.get("db_password"),
    {
        dialect : "postgres",
        logging : true,
        port: config.get("db_port"),
        port: config.get("db_host")
    }
)

module.exports = sequelize;