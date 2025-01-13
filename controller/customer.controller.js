const errorHandler = require("../helpers/errorHandler")
const Customer = require("../model/Customers")
const bcrypt = require("bcrypt")

const createCustomer = async (req, res) => {
    try {

        const { first_name, last_name, phone_number, email, password, pasport_seria, pasport_jshr, cart, address } = req.body

        const hashed_password = bcrypt.hashSync(password, 7)

        const customer = await Customer.create({first_name, last_name, phone_number, email, hashed_password, pasport_seria, pasport_jshr, cart, address})

        return res.status(201).send(customer);

    } catch (error) {
        errorHandler(error, res)
    }
}

const getCustomer = async (req, res) => {
    try {
        const customer = await Customer.find()
        if (!customer?.dataValues) {
            return res.status(404).send({message: "Customer not found"})
        }
        return res.status(200).send(customer)

    } catch (error) {
        errorHandler(error, res)
    }
}

const getCustomerById = async (req, res) => {
    try {
        const customer = await Customer.findByPk(req.params.id)
        if (!customer?.dataValues) {
            return res.status(404).send({message: "Customer not found"})
        }
        return res.status(200).send(customer.dataValues)

    } catch (error) {
        errorHandler(error, res)
    }
}


const updateCustomer = async (req, res) => {
    try {
        const { first_name, last_name, phone_number, email, pasport_seria, pasport_jshr, cart, address } = req.body
        const customer = await Customer.findByPk(req.params.id)
        if (!customer?.dataValues) {
            return res.status(404).send({message: "Customer not found"})
        }
        await customer.update({first_name, last_name, phone_number, email, pasport_seria, pasport_jshr, cart, address})
        return res.status(200).send(customer.dataValues)

    } catch (error) {
        errorHandler(error, res)
    }
}

const deleteCustomer = async (req, res) => {
    try {
        const customer = await Customer.findByPk(req.params.id)
        if (!customer?.dataValues) {
            return res.status(404).send({message: "Customer not found"})
        }
        await customer.destroy()
        return res.status(204).send()

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