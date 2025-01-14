const Joi = require("joi")

module.exports= {
    brandValidation : (data)=>{
        const brandSchema = Joi.object({
            name: Joi.string().min(2).required(),
            description: Joi.string().min(5).required()
        })

        return brandSchema.validate(data, {abortEarly: false})
    }
}