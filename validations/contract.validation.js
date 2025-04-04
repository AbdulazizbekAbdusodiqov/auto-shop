import Joi from "joi"

export function contractValidation(data) {
    const contractSchema = Joi.object({
        adminId: Joi.number().required(),
        customerId: Joi.number().required(),
        is_active: Joi.boolean().default(true),
        planId: Joi.number().required(),
        carId: Joi.number().required(),
        first_payment: Joi.number().required(),
        month_day: Joi.number().min(1).max(28).required(),
    })
    return contractSchema.validate(data, { abortEarly: false })
}