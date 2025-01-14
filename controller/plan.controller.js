const errorHandler = require("../helpers/errorHandler")
const Plan = require("../model/Plan")



const createPlan = async (req, res) => {
    try {
        const { month, markup_rate } = req.body

        const plan = await Plan.create({ month, markup_rate})

        return res.status(201).send({message: "Plan created", plan})

    } catch (error) {
        errorHandler(res, error)
    }
}

const getPlans = async (req, res) => {
    try {
        const plans = await Plan.findAll()
        
        if (!plans?.dataValues) {
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
        const { month, markup_rate } = req.body

        const plan = await Plan.findByPk(id)

        if (!plan?.dataValues) {
            return res.status(404).send({message: "Plan not found"})
        }

        await plan.update({ month, markup_rate })

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