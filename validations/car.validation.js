import Joi from "joi";

export function carValidation(data) {
    const carSchema = Joi.object({
        name: Joi.string().min(2).required(),
        brandId: Joi.number().required(),
        modelId: Joi.number().required(),
        colorId: Joi.number().required(),
        year: Joi.number().min(2000).max(2025).required(),
        price: Joi.number().required(),
        description: Joi.string().min(5).required(),
        fuel_type: Joi.string().valid("petrol", "diesel", "metan", "electric", "hybrid").required(),
        car_type: Joi.string().valid("sedan", "hatchback", "SUV", "coupe", "convertible", "wagon", "van", "pickup", "minivan").required(),
        gearBox: Joi.string().valid("manual", "automatic").required(),
        engine: Joi.string().required(),
        max_speed: Joi.number().min(50).required(),
        VIN: Joi.string().min(17).max(17).required(),
        img: Joi.string().required()
    });
    return carSchema.validate(data, { abortEarly: false });
}
