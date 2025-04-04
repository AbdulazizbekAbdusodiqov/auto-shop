import { Sequelize } from "sequelize";
import config from "config";


const sequelize = new Sequelize(
    config.get("db_name"),
    config.get("db_username"),
    config.get("db_password"),
    {
        dialect : "postgres",
        logging : false,
        port: config.get("db_port"),
        host: config.get("db_host")
    }
)

export default sequelize;