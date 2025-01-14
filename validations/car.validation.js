const Joi = require("joi")

module.exports = {
    carValidation: (data) => {
        const carSchema = Joi.object({
            name: Joi.string().min(2).required(),
            brandId: Joi.number().required(),
            modelId: Joi.number().required(),
            colorId: Joi.number().required(),
            year: Joi.number().min(2000).max(2025).required(),
            price: Joi.number().required(),
            description: Joi.string().min(5).required(),
            fuel_type: Joi.string().enum("Petrol", "Diesel", "metan", "Electric", "Hybrid").required(),
            car_type: Joi.string().enum("Sedan", "Hatchback", "SUV", "Coupe", "Convertible", "Wagon", "Van", "Pickup", "Minivan").required(),
            gearBox: Joi.string().enum("Manual", "Automatic").required(),
            engine : Joi.string().required(),
            max_speed : Joi.number().min(50).required(),
            img: Joi.string().required()
        })
        return carSchema.validate(data, { abortEarly: false })
    }
}