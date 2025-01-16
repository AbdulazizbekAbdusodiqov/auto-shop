const errorHandler = require("../helpers/errorHandler")
const Contract = require("../model/Contract")
const Plan = require("../model/Plan")
const { planValidation } = require("../validations/plan.validation")



const createPlan = async (req, res) => {
    try {

        const {error, value} = planValidation(req.body)

        if(error){
            return errorHandler(error, res)
        }

        const oldPlan = await Plan.findOne({where : {month : value.month}})

        if(oldPlan?.dataValues){
            return res.status(400).send({message: "Plan already exists"})
        }

        const plan = await Plan.create({...value})

        return res.status(201).send({message: "Plan created", plan})

    } catch (error) {
        errorHandler(res, error)
    }
}

const getPlans = async (req, res) => {
    try {
        const plans = await Plan.findAll()
        
        if (!plans[0]?.dataValues) {
            return res.status(404).send({message: "Plans not found"})
        }

        return res.status(200).send(plans)
    } catch (error) {
        errorHandler(res, error)
    }
}

const getPlanById = async (req, res) => {
    try {
        const { id } = req.params

        const plan = await Plan.findByPk(id)

        if (!plan?.dataValues) {
            return res.status(404).send({message: "Plan not found"})
        }

        return res.status(200).send(plan)

    } catch (error) {
        errorHandler(res, error)
    }
}


const updatePlan = async (req, res) => {
    try {
        const { id } = req.params

        const plan = await Plan.findByPk(id,{include : Contract})

        if (!plan?.dataValues) {
            return res.status(404).send({message: "Plan not found"})
        }

        const { error, value } = planValidation(req.body)
        if(error){
            return errorHandler(error, res)
        }

        await plan.update({...value} )

        return res.status(200).send({message: "Plan updated", plan})

    } catch (error) {
        errorHandler(res, error)
    }
}


const deletePlan = async (req, res) => {
    try {
        
        const  {id} = req.params

        const plan = await Plan.findByPk(id)
        if (!plan?.dataValues) {
            return res.status(404).send({message: "Plan not found"})
        }
        await plan.destroy()
        return res.status(200).send({message: "Plan deleted"})

    } catch (error) {
        errorHandler(error, res)
    }
}


module.exports = {
    createPlan,
    getPlans,
    getPlanById,
    updatePlan,
    deletePlan
}