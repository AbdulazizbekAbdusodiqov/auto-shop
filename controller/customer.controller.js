const bcrypt = require("bcrypt")
const errorHandler = require("../helpers/errorHandler")
const Brand = require("../model/Brand")
const Customer = require("../model/Customers")
const Model = require("../model/Model")
const Color = require("../model/Color")
const Ban = require("../model/Ban")
const Contract = require("../model/Contract")
const { customerValidation } = require("../validations/customer.validation")
const { CustomerJwt } = require("../service/jwt.service")

const createCustomer = async (req, res) => {
    try {

        const { error, value} = customerValidation(req.body)
        if (error) {
            return errorHandler(error, res)
        }
        const oldCustomer = await Customer.findOne({ where: { email : value.email }} )
        
        if (oldCustomer?.dataValues) {
            return res.status(400).json({ message: "Customer already exists" });
        }
        
        const hashed_password = bcrypt.hashSync(value.password, 7)
        
        
        
        const customer = await Customer.create({ ...value, hashed_password })
        const payload = {
            id: customer.id,
            email: value.email,
            role: "customer"
        }
        
        const tokens = CustomerJwt.generateTokens(payload)

        customer.hashed_refresh_token = tokens.refreshToken

        await customer.update({ ...value, hashed_refresh_token: tokens.refreshToken })

        return res.status(201).send(customer);

    } catch (error) {
        errorHandler(error, res)
    }
}

const getCustomer = async (req, res) => {
    try {
        const customer = await Customer.findAll({ include: [Contract, Ban] })
        if (!customer[0]?.dataValues) {
            return res.status(404).send({ message: "Customer not found" })
        }
        return res.status(200).send(customer)

    } catch (error) {
        errorHandler(error, res)
    }
}

const getCustomerById = async (req, res) => {
    try {
        const customer = await Customer.findByPk(req.params.id, { include: [Contract, Ban] })
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

        const customer = await Customer.findByPk(req.params.id,{ include: [Contract, Ban]})
        
        if (!customer?.dataValues) {
            return res.status(404).send({ message: "Customer not found" })
        }

        const { error, value } = customerValidation(req.body)

        if (error) {
            return errorHandler(error, res)
        }
        await customer.update({ ...customer.dataValues, ...value })

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
        return res.status(200).send({ message: "Customer deleted" })

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