const errorHandler = require("../helpers/errorHandler")
const Contract = require("../model/Contract")
const Customer = require("../model/Customers")
const Payment = require("../model/Payment")
const { paymentValidation } = require("../validations/payment.validation")

const createPayment = async (req, res) => {
    try {
        
        const {error, value} = paymentValidation(req.body)
        
        if(error){
            return errorHandler( error,  res)
        }

        const payment = await Payment.create({ ...value})

        return res.status(201).send(payment)
    } catch (error) {
        errorHandler(error, res)
    }
}

const getPayments = async (req, res) => {
    try {
        const payments = await Payment.findAll({ include: [Contract, Customer] })

        if (!payments[0]?.dataValues) {
            return res.status(404).send({ message: "Payments not found" })
        }

        return res.status(200).send(payments)
    } catch (error) {
        errorHandler (error, res)
    }
}

const getPaymentById = async (req, res) => {
    try {
        const { id } = req.params

        const payment = await Payment.findByPk(id, { include: [Contract, Customer] })

        if (!payment?.dataValues) {
            return res.status(404).send({ message: "Payment not found" })
        }

        return res.status(200).send(payment)

    } catch (error) {
        errorHandler(error, res)
    }
}

const updatePayment = async (req, res) => {
    try {
        const { id } = req.params
        
        const payment = await Payment.findByPk(id, { include: [Contract, Customer] })
        
        if (!payment?.dataValues) {
            return res.status(404).send({ message: "Payment not found" })
        }

        const { error, value } = paymentValidation(req.body)
        
        if (error) {
            return errorHandler(error, res)
        }
        
        await payment.update({...value })

        return res.status(200).send(payment)

    } catch (error) {
        errorHandler(error, res)
    }
}

const deletePayment = async (req, res) => {
    try {
        const payment = await Payment.findByPk(req.params.id)
        if (!payment) {
            return res.status(404).send({ message: "Payment not found" })
        }
        await payment.destroy()
        return res.status(204).send()
    } catch (error) {
        errorHandler(error, res)
    }
}

module.exports = {
    createPayment,
    getPayments,
    getPaymentById,
    updatePayment,
    deletePayment
}