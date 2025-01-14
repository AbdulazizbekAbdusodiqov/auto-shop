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
        type: DataTypes.ENUM("Petrol", "Diesel", "metan", "Electric", "Hybrid")
    },
    car_type: {
        type: DataTypes.ENUM("Sedan", "Coupe", "SUV", "Hatchback", "Convertible", "Wagon", "Van", "Truck")
    },
    gearBox: {
        type: DataTypes.ENUM("Manual", "Automatic")
    },
    engine: {
        type: DataTypes.STRING
    },
    max_speed: {
        type: DataTypes.INTEGER
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