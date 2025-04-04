import errorHandler from "../helpers/errorHandler.js"
import Admin from "../model/Admin.js"
import Ban from "../model/Ban.js"
import Customer from "../model/Customer.js"
import { banValidation } from "../validations/ban.validation.js"

export const createBan = async (req, res) => {
    try {

        const { error, value } = banValidation(req.body)

        if (error) {
            return errorHandler(error, res)
        }

        const ban = await Ban.create({ ...value })

        return res.status(201).send({ message: "Ban created", ban })

    } catch (error) {
        errorHandler(error, res)
    }
}

export const getBans = async (req, res) => {
    try {
        const bans = await Ban.findAll({ include: [Admin, Customer] })

        if (!bans[0]?.dataValues) {
            return res.status(404).send({ message: "Banned user not found" })
        }

        return res.status(200).send(bans)
    } catch (error) {
        errorHandler(error, res)
    }
}

export const getBanById = async (req, res) => {
    try {
        const { id } = req.params

        const ban = await Ban.findByPk(id, { include: [Admin, Customer] })

        if (!ban?.dataValues) {
            return res.status(404).send({ message: "Banned user not found" })
        }

        return res.status(200).send(ban)

    } catch (error) {
        errorHandler(error, res)
    }
}

export const updateBan = async (req, res) => {
    try {
        const { id } = req.params
        const ban = await Ban.findByPk(id, { include: [Admin, Customer] })

        if (!ban?.dataValues) {
            return res.status(404).send({ message: "Banned user not found" })
        }

        const { error, value } = banValidation(req.body)
        if (error) {
            return errorHandler(error, res)
        }

        await ban.update({ ...value})

        return res.status(200).send(ban)

    } catch (error) {
        errorHandler(error, res)
    }
}

export const deleteBan = async (req, res) => {
    try {
        const ban = await Ban.findByPk(req.params.id)
        if (!ban) {
            return res.status(404).send({ message: "Banned user not found" })
        }
        await ban.destroy()
        return res.status(204).send({ message: "Banned user deleted" })
    } catch (error) {
        errorHandler(error, res)
    }
}

