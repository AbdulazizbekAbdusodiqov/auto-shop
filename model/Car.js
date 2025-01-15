const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Color = require("./Color");
const Model = require("./Model");
const Brand = require("./Brand");

const Car = sequelize.define("car", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    year: {
        type: DataTypes.DATEONLY,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
    },
    description: {
        type: DataTypes.STRING,
    },
    fuel_type: {
        type: DataTypes.ENUM("petrol", "diesel", "metan", "electric", "hybrid")
    },
    car_type: {
        type: DataTypes.ENUM("sedan", "hatchback", "SUV", "coupe", "convertible", "wagon", "van", "pickup", "minivan")
    },
    gearBox: {
        type: DataTypes.ENUM("manual", "automatic")
    },
    engine: {
        type: DataTypes.STRING
    },
    max_speed: {
        type: DataTypes.INTEGER
    },
    VIN : {
        type: DataTypes.STRING(17) 
    },
    img: {
        type: DataTypes.STRING
    }
}, {
    freezeTableName: true,
});

Car.belongsTo(Model)
Model.hasMany(Car)

Car.belongsTo(Color)
Color.hasMany(Car)

Car.belongsTo(Brand)
Brand.hasMany(Car)

module.exports = Car;