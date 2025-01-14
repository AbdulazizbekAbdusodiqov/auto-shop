const Joi = require("joi")

module.exports = {
    banValidation: (data) => {
        const banSchema = Joi.object({
            adminId: Joi.number().required(),
            customerId: Joi.number().required(),
            reason: Joi.string().required(),
        })
        return banSchema.validate(data, { abortEarly: false })
    }
}