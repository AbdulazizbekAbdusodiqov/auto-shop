import errorHandler from "../helpers/errorHandler.js"
import Contract from "../model/Contract.js"
import Customer from "../model/Customer.js"
import Payment from "../model/Payment.js"
import { paymentValidation } from "../validations/payment.validation.js"

export const createPayment = async (req, res) => {
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

export const getPayments = async (req, res) => {
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

export const getPaymentById = async (req, res) => {
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

export const updatePayment = async (req, res) => {
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

export const deletePayment = async (req, res) => {
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

