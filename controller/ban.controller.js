const errorHandler = require("../helpers/errorHandler")
const Admin = require("../model/Admin")
const Ban = require("../model/Ban")
const Customer = require("../model/Customers")

const createBan = async (req, res) => {
    try {
        const { adminId, customerId, reason, } = req.body

        const ban = await Ban.create({ adminId, customerId, reason })

        return res.status(201).send({ message: "Ban created", ban })

    } catch (error) {
        errorHandler(res, error)
    }
}

const getBans = async (req, res) => {
    try {
        const bans = await Ban.findAll({ include: [Admin, Customer] })

        if (!bans?.dataValues) {
            return res.status(404).send({ message: "Banned user not found" })
        }

        return res.status(200).send(bans)
    } catch (error) {
        errorHandler(res, error)
    }
}

const getBanById = async (req, res) => {
    try {
        const { id } = req.params

        const ban = await Ban.findByPk(id, { include: [Admin, Customer] })

        if (!ban?.dataValues) {
            return res.status(404).send({ message: "Banned user not found" })
        }

        return res.status(200).send(ban)

    } catch (error) {
        errorHandler(res, error)
    }
}

const updateBan = async (req, res) => {
    try {
        const { id } = req.params
        const ban = await Ban.findByPk(id, {include: [Admin, Customer]})
        
        if (!ban?.dataValues) {
            return res.status(404).send({ message: "Banned user not found" })
        }
        
        const { reason, adminId, customerId } = req.body
 
        await ban.update({ reason, adminId, customerId })
 
        return res.status(200).send(ban)

    } catch (error) {
        errorHandler(res, error)
    }
}

const deleteBan = async (req, res) => {
    try {
        const ban = await Ban.findByPk(req.params.id)
        if (!ban) {
            return res.status(404).send({ message: "Banned user not found" })
        }
        await ban.destroy()
        return res.status(204).send({ message: "Banned user deleted" })
    } catch (error) {
        errorHandler(res, error)
    }
}

module.exports = {
    createBan,
    getBans,
    getBanById,
    updateBan,
    deleteBan
}