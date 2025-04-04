import Joi from "joi"

export function customerValidation(data) {
    const customerSchema = Joi.object({
        first_name: Joi.string().min(3).max(30).required(),
        last_name: Joi.string().min(3).max(30).required(),
        phone_number: Joi.string().min(9).max(12).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(5).max(30).required(),
        pasport_seria: Joi.string().min(9).max(9).required(),
        pasport_jshshr: Joi.string().min(14).max(14).required(),
        cart: Joi.string().min(16).max(16).required(),
        address: Joi.string().min(5).required(),
        is_active: Joi.boolean().default(false),
    })

    return customerSchema.validate(data, { abortEarly: false })
}