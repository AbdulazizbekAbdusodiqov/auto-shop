// import { date } from "joi"
import errorHandler from "../helpers/errorHandler.js"
import Brand from "../model/Brand.js"
import Car from "../model/Car.js"
import Model from "../model/Model.js"
import { brandValidation } from "../validations/brand.validation.js"

export const createBrand = async (req, res) => {
    try {
        const {error, value} = brandValidation(req.body)

        if(error){
            return errorHandler(error, res)
        }

        const brand = await Brand.create({ ...value })
        return res.status(201).send(brand)

    } catch (error) {
        errorHandler(error, res)
    }
}

export const getBrands = async (req, res) => { 
    try {
        const brands = await Brand.findAll({include:[Car, Model]})
        
        

        if (!brands[0]?.dataValues) {
            return res.status(404).send({message: "Brand not found"})
        }
        return res.status(200).send(brands)

    } catch (error) {
        errorHandler(error, res)
    }
}

export const getBrandById = async (req, res) => {
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

export const updateBrand = async (req, res) => {
    try {
        const brand = await Brand.findByPk(req.params.id, {include:[Car, Model]})
        if (!brand?.dataValues) {
            return res.status(404).send({message: "Brand not found"})
        }
        const { name, description } = req.body
        await brand.update({ name, description })
        return res.status(200).send(brand.dataValues)

    } catch (error) {
        errorHandler(error, res)
    }
}

export const deleteBrand = async (req, res) => {
    try {
        const brand = await Brand.findByPk(req.params.id)
        if (!brand) {
            return res.status(404).send({message: "Brand not found"})
        }
        await brand.destroy()

        return res.status(200).send({message:"Brand deleted"})

    } catch (error) {
        errorHandler(error, res)
    }
}   

