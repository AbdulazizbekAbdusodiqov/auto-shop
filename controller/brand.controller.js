const errorHandler = require("../helpers/errorHandler")
const Brand = require("../model/Brand")
const Car = require("../model/Car")
const Model = require("../model/Model")

const createBrand = async (req, res) => {
    try {
        const { name } = req.body
        const brand = await Brand.create({ name })
        return res.status(201).send(brand)

    } catch (error) {
        errorHandler(error, res)
    }
}

const getBrands = async (req, res) => { 
    try {
        const brands = await Brand.findAll({include:[Car, Model]})
        if (!brands?.dataValues) {
            return res.status(404).send({message: "Brand not found"})
        }
        return res.status(200).send(brands)

    } catch (error) {
        errorHandler(error, res)
    }
}

const getBrandById = async (req, res) => {
    try {
        const brand = await Brand.findByPk(req.params.id)
        if (!brand?.dataValues) {
            return res.status(404).send({message: "Brand not found"})
        }
        return res.status(200).send(brand.dataValues)

    } catch (error) {
        errorHandler(error, res)
    }
}

const updateBrand = async (req, res) => {
    try {
        const { name } = req.body
        const brand = await Brand.findByPk(req.params.id, {include:[Car, Model]})
        if (!brand?.dataValues) {
            return res.status(404).send({message: "Brand not found"})
        }
        await brand.update({ name })
        return res.status(200).send(brand.dataValues)

    } catch (error) {
        errorHandler(error, res)
    }
}

const deleteBrand = async (req, res) => {
    try {
        const brand = await Brand.findByPk(req.params.id)
        if (!brand) {
            return res.status(404).send({message: "Brand not found"})
        }
        await brand.destroy()
        return res.status(204).send({message:"Brand deleted"})

    } catch (error) {
        errorHandler(error, res)
    }
}   

module.exports = {
    createBrand,
    getBrands,
    getBrandById,
    updateBrand,
    deleteBrand
}