const bcrypt = require("bcrypt")
const config = require('config')
const uuid  = require("uuid")
const errorHandler = require("../helpers/errorHandler")
const Brand = require("../model/Brand")
const Customer = require("../model/Customer")
const Model = require("../model/Model")
const Color = require("../model/Color")
const Ban = require("../model/Ban")
const Contract = require("../model/Contract")
const { customerValidation } = require("../validations/customer.validation")
const { CustomerJwt } = require("../service/jwt.service")
const mailService = require("../service/mail.service")

const createCustomer = async (req, res) => {
    try {

        const { error, value } = customerValidation(req.body)
        if (error) {
            return errorHandler(error, res)
        }
        const oldCustomer = await Customer.findOne({ where: { email: value.email } })

        if (oldCustomer?.dataValues) {
            return res.status(400).json({ message: "Customer already exists" });
        }

        const hashed_password = bcrypt.hashSync(value.password, 7)

        const activation_link = uuid.v4()


        const customer = await Customer.create({ ...value, hashed_password, activation_link })
        const payload = {
            id: customer.id,
            email: value.email,
            role: "customer"
        }

        
        const tokens = CustomerJwt.generateTokens(payload)
        
        customer.hashed_refresh_token = tokens.refreshToken
        
        await customer.update({ ...value, hashed_refresh_token: tokens.refreshToken })
        
        await mailService.sendMailActivationCode(customer.email,
             `${config.get("api_url")}${config.get("port")}/api/customer/activate/${activation_link}`
         );

        return res.status(201).send({ customer, access_token: tokens.accessToken });

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

        const customer = await Customer.findByPk(req.params.id, { include: [Contract, Ban] })

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

const loginCustomer = async (req, res) => {
    try {
        const { email, password } = req.body

        const customer = await Customer.findOne({ where: { email } })
        if (!customer?.dataValues) {
            return res.status(401).send({ message: "Invalid email or password" })
        }
        const validPassword = bcrypt.compareSync(password, customer.hashed_password)
        if (!validPassword) {
            return res.status(401).send({ message: "Invalid email or password" })
        }

        const payload = {
            id: customer.id,
            email,
            role: "customer"
        }
        const tokens = CustomerJwt.generateTokens(payload)

        res.cookie("refreshToken", tokens.refreshToken, {
            httpOnly: true,
            maxAge: config.get("refresh_token_ms")
        })

        await customer.update({ hashed_refresh_token: tokens.refreshToken })

        return res.status(200).send({
            message: "welcome to auto-shop",
            customer,
            refresh_token: customer.hashed_refresh_token,
            access_token: tokens.accessToken
        })

    } catch (error) {
        errorHandler(error, res)
    }
}

const logoutCustomer = async (req, res) => {
    try {
        const { refreshToken } = req.cookies
        if (!refreshToken) {
            return res.status(404).send({ message: "token not found" })
        }

        const customer = await Customer.findOne({ where: { hashed_refresh_token: refreshToken } })
        if (!customer?.dataValues) {
            return res.status(404).send({ message: "customer didn't exists" })
        }
        res.clearCookie("refreshToken");

        await customer.update({ hashed_refresh_token: "" })

        return res.status(200).send({ message: "succes", refreshToken: customer.hashed_refresh_token });


    } catch (error) {
        errorHandler(error, res)
    }
}

const refreshCustomerToken = async (req, res) => {
    try {
        const { refreshToken } = req.cookies
        if (!refreshToken) {
            return res.status(404).send({ message: " not found token" })
        }

        try {
            const tokenFromCookie = await CustomerJwt.verifyRefreshToken(refreshToken)

        } catch (error) {
            return errorHandler(error, res)
        }

        const customer = await Customer.findOne({
            where: {
                hashed_refresh_token: refreshToken
            }
        })

        const payload = {
            id: customer.id,
            email: customer.email,
            role: "customer"
        }

        const tokens = CustomerJwt.generateTokens(payload)

        await customer.update({ hashed_refresh_token: tokens.refreshToken })
        res.cookie("refreshToken", customer.hashed_refresh_token, {
            httpOnly: true,
            maxAge: config.get("refresh_token_ms")
        });

        return res.status(200).send({
            message : "welcome to auto-shop",
            refreshToken : customer.hashed_refresh_token,
            accessToken : tokens.accessToken
        })

    } catch (error) {
        errorHandler(error, res)
    }
}

const activateCustomer = async (req, res) => {
    try {
        const link = req.params.link;

        const customer = await Customer.findOne({ where: { activation_link: link } });

        if (!customer?.dataValues) {
            return res.status(400).send({ message: "No such user found" })
        }
        if (customer.is_active) {
            return res.status(400).send({ message: "user has already activated" })
        }

        await customer.update({ is_active: true })

        res.send({
            message: "Customer activated",
            is_active: customer.is_active
        })

    } catch (error) {
        errorHandler(error, res)
    }
}


module.exports = {
    createCustomer,
    getCustomer,
    getCustomerById,
    updateCustomer,
    deleteCustomer,
    loginCustomer,
    logoutCustomer,
    refreshCustomerToken,
    activateCustomer
}