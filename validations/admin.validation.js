const Joi = require("joi")

module.exports= {
    adminValidation : (data)=>{
        const adminSchema = Joi.object({
            first_name: Joi.string().min(3).max(30).required(),
            last_name: Joi.string().min(3).max(30).required(),
            phone_number: Joi.string().min(9).max(12).required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(5).max(30).required(),
            is_creator : Joi.boolean().default(false),
            is_active : Joi.boolean().default(false)
        })

        return adminSchema.validate(data, {abortEarly: false})
    }
}