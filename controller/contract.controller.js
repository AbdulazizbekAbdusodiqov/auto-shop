const Car = require("../model/Car")
const Contract = require("../model/Contract")
const Plan = require("../model/Plan")


const createContract = async (req, res) => {
    try {
        const { adminId, CustomerId, term, PlanId, CarId, first_payment, month_day, contract_start_date,} = req.body

        const car = await Car.findByPk(CarId)

        if(!car?.dataValues){
            return res.status(404).send({message: "Car not found"})
        }
        const plan = await Plan.findByPk(PlanId)

        if(!plan?.dataValues){
            return res.status(404).send({message: "Plan not found"})
        }
        const total_price = (car.price - first_payment) * ( plan.markup_rate * 0.01 + 1) + first_payment
        const monthly_payment = ((car.price - first_payment) * ( plan.markup_rate * 0.01 + 1))/ plan.month

        const contract = await Contract.create({ adminId, CustomerId, term, PlanId, CarId, first_payment, month_day, contract_start_date, monthly_payment, total_price})

        return res.status(201).send({ message: "Contact created", contract })

    } catch (error) {
        errorHandler(res, error)
    }
}

const getContracts = async (req, res) => {
    try {
        const contracts = await Contract.findAll()

        if (!contracts?.dataValues) {
            return res.status(404).send({message: "Contracts not found"})
        }

        return res.status(200).send(contracts)
    } catch (error) {
        errorHandler(res, error)
    }
}

const getContractById = async (req, res) => {
    try {
        const { id } = req.params

        const contract = await Contract.findByPk(id)

        if (!contract?.dataValues) {
            return res.status(404).send({message: "Contract not found"})
        }

        return res.status(200).send(contract)

    } catch (error) {
        errorHandler(res, error)
    }
}   

const updateContract = async (req, res) => {
    try {
        const { id } = req.params
        
        const contract = await Contract.findByPk(id)
        
        if (!contract?.dataValues) {
            return res.status(404).send({message: "Contract not found"})
        }
        const { adminId, CustomerId, term, PlanId, CarId, first_payment, month_day, contract_start_date, monthly_payment, total_price } = req.body

        await contract.update({ adminId, CustomerId, term, PlanId, CarId, first_payment, month_day, contract_start_date, monthly_payment, total_price })

        return res.status(200).send({ message: "Contract updated", contract })

    } catch (error) {
        errorHandler(res, error)
    }
}

const deleteContract = async (req, res) => {
    try {
        const { id } = req.params

        const contract = await Contract.findByPk(id)

        if (!contract?.dataValues) {
            return res.status(404).send({message: "Contract not found"})
        }

        await contract.destroy()

        return res.status(200).send({message: "Contract deleted"})

    } catch (error) {
        errorHandler(res, error)
    }
}

module.exports = {
    createContract,
    getContracts,
    getContractById,
    updateContract,
    deleteContract
}