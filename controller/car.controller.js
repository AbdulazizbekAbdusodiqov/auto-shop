const { Op } = require("sequelize")
const errorHandler = require("../helpers/errorHandler")
const Brand = require("../model/Brand")
const Car = require("../model/Car")
const Color = require("../model/Color")
const Contract = require("../model/Contract")
const Model = require("../model/Model")
const { carValidation } = require("../validations/car.validation")

const createCar = async (req, res) => {
    try {

        const {error, value} = carValidation(req.body)

        if(error){
            return errorHandler(error, res)
        }

        const car = await Car.create({ ...value })

        return res.status(201).send(car)

    } catch (error) {
        errorHandler(error, res)
    }
}

const getCars = async (req, res) => {
    try {
        const cars = await Car.findAll({ include: [Brand, Model, Color, Contract] })

        if (!cars[0]?.dataValues) {
            return res.status(404).send({ message: "Cars not found" })
        }
        return res.status(200).send(cars)

    } catch (error) {
        errorHandler(res, error)
    }
}

const getCarById = async (req, res) => {
    try {
        const { id } = req.params

        const car = await Car.findByPk(id, { include: [Brand, Model, Color, Contract] })

        if (!car?.dataValues) {
            return res.status(404).send({ message: "Car not found" })
        }

        return res.status(200).send(car)

    } catch (error) {
        errorHandler(res, error)
    }
}


const updateCar = async (req, res) => {
    try {
        const { id } = req.params

        const car = await Car.findByPk(id, { include: [Brand, Model, Color, Contract] })

        if (!car?.dataValues) {
            return res.status(404).send({ message: "Car not found" })
        }

        const { error, value } = carValidation(req.body)

        await car.update({ ...value })

        return res.status(200).send({ message: "Car updated", car: car.dataValues })

    } catch (error) {
        errorHandler(res, error)
    }
}


const deleteCar = async (req, res) => {
    try {
        const { id } = req.params

        const car = await Car.findByPk(id,{ include: [Brand, Model, Color, Contract] })

        if (!car?.dataValues) {
            return res.status(404).send({ message: "Car not found" })
        }

        await car.destroy({ where: { id } })

        return res.status(200).send({ message: "Car deleted" })

    } catch (error) {
        errorHandler(res, error)
    }
}



module.exports = {
    createCar,
    getCars,
    getCarById,
    updateCar,
    deleteCar
}