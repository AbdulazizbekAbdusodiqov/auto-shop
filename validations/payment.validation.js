const Joi = require("joi")

module.exports = {
    paymentValidation: (data) => {
        const paymentSchema = Joi.object({
            contractId: Joi.number().required(),
            customerId : Joi.number().required(),
            amount: Joi.number().required(),
            payment_date: Joi.date().required(),
        })
        return paymentSchema.validate(data, { abortEarly: false })
    }
}