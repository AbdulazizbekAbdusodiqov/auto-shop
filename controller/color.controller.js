import errorHandler from "../helpers/errorHandler.js"
import Car from "../model/Car.js"
import Color from "../model/Color.js"
import { colorValidation } from "../validations/color.validation.js"

export const createColor = async (req, res) => {
    try {

        let { name } = req.body
        name = name.toLowerCase()
        
        const oldColor = await Color.findOne({where: {name}})

        if(oldColor?.dataValues){
            return res.status(400).send({message: "color already exists"})
        }

        const {error, value} = colorValidation(req.body)

        if(error){
            return errorHandler(error, res)
        }

        const color = await Color.create({ ...value})
        return res.status(201).send(color)

    } catch (error) {
        errorHandler(error, res)
    }
}

export const getColors = async (req, res) => { 
    try {
        const colors = await Color.findAll({include : Car})
        if (!colors?.dataValues) {
            return res.status(404).send({message: "color not found"})
        }
        return res.status(200).send(colors)

    } catch (error) {
        errorHandler(error, res)
    }
}

export const getColorById = async (req, res) => {
    try {
        const color = await Color.findByPk(req.params.id, {include : Car})
        if (!color?.dataValues) {
            return res.status(404).send({message: "color not found"})
        }
        return res.status(200).send(color.dataValues)

    } catch (error) {
        errorHandler(error, res)
    }
}

export const updateColor = async (req, res) => {
    try {
        const { name } = req.body
        const color = await Color.findByPk(req.params.id,  {include : Car})
        if (!color?.dataValues) {
            return res.status(404).send({message: "color not found"})
        }
        await color.update({ name })
        return res.status(200).send(color.dataValues)

    } catch (error) {
        errorHandler(error, res)
    }
}

export const deleteColor = async (req, res) => {
    try {
        const color = await Color.findByPk(req.params.id)
        
        if (!color) {
            return res.status(404).send({message: "color not found"})
        }
        await color.destroy()

        return res.status(200).send({message:"color deleted"})

    } catch (error) {
        errorHandler(error, res)
    }
}   

