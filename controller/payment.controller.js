const errorHandler = require("../helpers/errorHandler")
const Contract = require("../model/Contract")
const Customer = require("../model/Customers")
const Payment = require("../model/Payment")

const createPayment = async (req, res) => {
    try {
        const { amount, payment_date, payment_method, contractId, customerId, status } = req.body


        const payment = await Payment.create({ amount, payment_date, payment_method, contractId, customerId, status })

        return res.status(201).send(payment)
    } catch (error) {
        errorHandler(res, error)
    }
}

const getPayments = async (req, res) => {
    try {
        const payments = await Payment.findAll({ include: [Contract, Customer] })

        if (!payments?.dataValues) {
            return res.status(404).send({ message: "Payments not found" })
        }

        return res.status(200).send(payments)
    } catch (error) {
        errorHandler(res, error)
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
        errorHandler(res, error)
    }
}

const updatePayment = async (req, res) => {
    try {
        const { id } = req.params
        
        const payment = await Payment.findByPk(id, { include: [Contract, Customer] })
        
        if (!payment?.dataValues) {
            return res.status(404).send({ message: "Payment not found" })
        }
        const { amount, payment_date, payment_method, contractId, customerId, status } = req.body
        
        await payment.update({ amount, payment_date, payment_method, contractId, customerId, status })

        return res.status(200).send(payment)

    } catch (error) {
        errorHandler(res, error)
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
        errorHandler(res, error)
    }
}

module.exports = {
    createPayment,
    getPayments,
    getPaymentById,
    updatePayment,
    deletePayment
}