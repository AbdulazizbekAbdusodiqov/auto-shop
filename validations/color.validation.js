import Joi from "joi"

export function colorValidation(data) {
    const colorSchema = Joi.object({
        name: Joi.string().min(2).lowercase().required(),
    })
    return colorSchema.validate(data, { abortEarly: false })
}
