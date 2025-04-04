import Joi from "joi"

export function paymentValidation(data) {
    const paymentSchema = Joi.object({
        contractId: Joi.number().required(),
        customerId: Joi.number().required(),
        amount: Joi.number().required(),
        payment_date: Joi.date().required(),
        status: Joi.string().valid("Paid", "Pending").default("Pending"),
        payment_method: Joi.string().valid("Credit Card", "Cash").required()
    })
    return paymentSchema.validate(data, { abortEarly: false })
}