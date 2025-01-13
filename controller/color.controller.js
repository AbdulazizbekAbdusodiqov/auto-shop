const Color = require("../model/Color")

const createColor = async (req, res) => {
    try {
        const { name } = req.body
        const color = await Color.create({ name })
        return res.status(201).send(color)

    } catch (error) {
        errorHandler(error, res)
    }
}

const getColors = async (req, res) => { 
    try {
        const colors = await Color.findAll()
        if (!colors?.dataValues) {
            return res.status(404).send({message: "color not found"})
        }
        return res.status(200).send(colors)

    } catch (error) {
        errorHandler(error, res)
    }
}

const getColorById = async (req, res) => {
    try {
        const color = await Color.findByPk(req.params.id)
        if (!color?.dataValues) {
            return res.status(404).send({message: "color not found"})
        }
        return res.status(200).send(color.dataValues)

    } catch (error) {
        errorHandler(error, res)
    }
}

const updateColor = async (req, res) => {
    try {
        const { name } = req.body
        const color = await Color.findByPk(req.params.id)
        if (!color?.dataValues) {
            return res.status(404).send({message: "color not found"})
        }
        await color.update({ name })
        return res.status(200).send(color.dataValues)

    } catch (error) {
        errorHandler(error, res)
    }
}

const deleteColor = async (req, res) => {
    try {
        const color = await Color.findByPk(req.params.id)
        if (!color) {
            return res.status(404).send({message: "color not found"})
        }
        await color.destroy()
        return res.status(204).send({message:"color deleted"})

    } catch (error) {
        errorHandler(error, res)
    }
}   

module.exports = {
    createColor,
    getColors,
    getColorById,
    updateColor,
    deleteColor
}