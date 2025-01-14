const errorHandler = require("../helpers/errorHandler")
const bcrypt = require("bcrypt")
const Brand = require("../model/Brand")
const Customer = require("../model/Customers")
const Model = require("../model/Model")
const Color = require("../model/Color")
const Ban = require("../model/Ban")

const createCustomer = async (req, res) => {
    try {

        const { first_name, last_name, phone_number, email, password, pasport_seria, pasport_jshshr, cart, address } = req.body

        const oldCustomer = await Customer.findOne({ where: { email }} )

        if (oldCustomer?.dataValues) {
            return res.status(400).json({ message: "Customer already exists" });
        }

        const hashed_password = bcrypt.hashSync(password, 7)

        const customer = await Customer.create({ first_name, last_name, phone_number, email, hashed_password, pasport_seria, pasport_jshshr, cart, address })


        return res.status(201).send(customer);

    } catch (error) {
        errorHandler(error, res)
    }
}

const getCustomer = async (req, res) => {
    try {
        const customer = await Customer.findAll({ include: [Brand, Model, Color, Ban] })
        if (!customer?.dataValues) {
            return res.status(404).send({ message: "Customer not found" })
        }
        return res.status(200).send(customer)

    } catch (error) {
        errorHandler(error, res)
    }
}

const getCustomerById = async (req, res) => {
    try {
        const customer = await Customer.findByPk(req.params.id, { include: [Brand, Model, Color] })
        if (!customer?.dataValues) {
            return res.status(404).send({ message: "Customer not found" })
        }
        return res.status(200).send(customer.dataValues)

    } catch (error) {
        errorHandler(error, res)
    }
}


const updateCustomer = async (req, res) => {
    try {
        const { first_name, last_name, phone_number, email, pasport_seria, pasport_jshr, cart, address } = req.body
        const customer = await Customer.findByPk(req.params.id,{ include: [Brand, Model, Color, Ban]})
        if (!customer?.dataValues) {
            return res.status(404).send({ message: "Customer not found" })
        }
        await customer.update({ first_name, last_name, phone_number, email, pasport_seria, pasport_jshr, cart, address })
        return res.status(200).send(customer.dataValues)

    } catch (error) {
        errorHandler(error, res)
    }
}

const deleteCustomer = async (req, res) => {
    try {
        const customer = await Customer.findByPk(req.params.id)
        if (!customer?.dataValues) {
            return res.status(404).send({ message: "Customer not found" })
        }
        await customer.destroy()
        return res.status(204).send({ message: "Customer deleted" })

    } catch (error) {
        errorHandler(error, res)
    }
}

module.exports = {
    createCustomer,
    getCustomer,
    getCustomerById,
    updateCustomer,
    deleteCustomer
}