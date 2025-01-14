const Joi = require("joi")

module.exports = {
    modelValidation: (data) => {
        const modelSchema = Joi.object({
            name: Joi.string().min(2).required(),
            brandId: Joi.number().required()
        })
        return modelSchema.validate(data, { abortEarly: false })
    }
}