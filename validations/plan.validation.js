const Joi = require("joi") 

module.exports = {
    planValidation: (data) => {
        const planSchema = Joi.object({
            month : Joi.number().min(1).max(70).required(),
            markup_rate : Joi.number().min(1).max(80).required(),
        })

        return planSchema.validate(data, { abortEarly: false })
    }
}