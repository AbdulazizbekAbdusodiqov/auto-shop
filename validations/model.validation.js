import Joi from "joi"

export function modelValidation(data) {
    const modelSchema = Joi.object({
        name: Joi.string().min(2).lowercase().required(),
        brandId: Joi.number().required()
    })
    return modelSchema.validate(data, { abortEarly: false })
}