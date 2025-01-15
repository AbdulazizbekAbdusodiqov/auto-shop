const Joi = require("joi")

module.exports = {
    colorValidation: (data) => {
        const colorSchema = Joi.object({
            name: Joi.string().min(2).lowercase().required(),
        })
        return colorSchema.validate(data, { abortEarly: false })
    }
}
