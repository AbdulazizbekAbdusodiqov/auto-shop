import { DATE, Op } from "sequelize"
import errorHandler from "../helpers/errorHandler.js"
import Admin from "../model/Admin.js"
import Car from "../model/Car.js"
import Contract from "../model/Contract.js"
import Customer from "../model/Customer.js"
import Payment from "../model/Payment.js"
import Plan from "../model/Plan.js"
import { contractValidation } from "../validations/contract.validation.js"


export const createContract = async (req, res) => {
    try {

        const{error, value} = contractValidation(req.body)

        if(error){
            return errorHandler(error, res)
        }
        
        const car = await Car.findOne({where : {id : value.carId}, include : Contract})
        
        if (!car?.dataValues) {
            return res.status(404).send({ message: "Car not found" })
        }
        console.log(car.dataValues);
        
        if(car.dataValues.contracts[0]){
            return res.status(400).send({message: "Car already sold"})
        }
        const plan = await Plan.findByPk(value.planId)

        if (!plan?.dataValues) {
            return res.status(404).send({ message: "Plan not found" })
        }

        
        const total_price = (car.price - value.first_payment) * (plan.markup_rate * 0.01 + 1) + value.first_payment
        const monthly_payment = ((car.price - value.first_payment) * (plan.markup_rate * 0.01 + 1)) / plan.month


        const term =  new Date()
        term.setMonth(term.getMonth() + plan.month)

        
        const contract = await Contract.create({...value, monthly_payment, total_price, term })

        return res.status(201).send({ message: "Contact created", contract })

    } catch (error) {
        errorHandler(error, res)
    }
}

export const getContracts = async (req, res) => {
    try {
        const contracts = await Contract.findAll({ include: [Admin, Customer, Plan, Car, Payment] })

        if (!contracts[0]?.dataValues) {
            return res.status(404).send({ message: "Contracts not found" })
        }

        return res.status(200).send(contracts)
    } catch (error) {
        errorHandler(error, res)
    }
}

export const getContractById = async (req, res) => {
    try {
        const { id } = req.params

        const contract = await Contract.findByPk(id, { include: [Admin, Customer, Plan, Car, Payment] })

        if (!contract?.dataValues) {
            return res.status(404).send({ message: "Contract not found" })
        }

        return res.status(200).send(contract)

    } catch (error) {
        errorHandler( error, res)
    }
}

export const updateContract = async (req, res) => {
    try {

        const { id } = req.params

        const contract = await Contract.findByPk(id, { include: [Admin, Customer, Plan, Car, Payment] })

        if (!contract?.dataValues) {
            return res.status(404).send({ message: "Contract not found" })
        }

        const {error, value} = contractValidation(req.body)

        const car = await Car.findOne({where : {id : value.carId}, include : Contract})
        
        if (!car?.dataValues) {
            return res.status(404).send({ message: "Car not found" })
        }
        
        const plan = await Plan.findByPk(value.planId)

        if (!plan?.dataValues) {
            return res.status(404).send({ message: "Plan not found" })
        }
        
        const total_price = (car.price - value.first_payment) * (plan.markup_rate * 0.01 + 1) + value.first_payment
        const monthly_payment = ((car.price - value.first_payment) * (plan.markup_rate * 0.01 + 1)) / plan.month


        const term =  new Date()
        term.setMonth(term.getMonth() + plan.month)

        
        await contract.update({ ...value ,monthly_payment, total_price, term})

        return res.status(200).send({ message: "Contract updated", contract })

    } catch (error) {
        errorHandler( error, res)
    }
}

export const deleteContract = async (req, res) => {
    try {
        const { id } = req.params

        const contract = await Contract.findByPk(id)

        if (!contract?.dataValues) {
            return res.status(404).send({ message: "Contract not found" })
        }

        await contract.destroy()

        return res.status(200).send({ message: "Contract deleted" })

    } catch (error) {
        errorHandler( error, res)
    }
}
export const getSoldCarsDateRange = async (req, res) => {
    try {
        const { startDate, endDate } = req.body;

        const contracts = await Contract.findAll({
            where: {
                createdAt: {
                    [Op.between]: [startDate, endDate]
                }
            },
            include: [Car, Customer]
        });

        res.status(200).json(contracts);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Xatolik yuz berdi" });
    }
};

