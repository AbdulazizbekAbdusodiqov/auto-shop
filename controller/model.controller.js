const errorHandler = require("../helpers/errorHandler");
const Brand = require("../model/Brand");
const Model = require("../model/Model");
const { modelValidation } = require("../validations/model.validation");

const createModel = async (req, res) => {
    try {
        let {name} = req.body
        name = name.toLowerCase();

        const oldModel = await Model.findOne({where: {name}});

        if(oldModel?.dataValues){
            return res.status(400).send({message: "Model already exists"});
        }

        const {error, value} = modelValidation(req.body);
        if(error){
            return errorHandler(error, res);
        }
        const model = await Model.create({ ...value});
        return res.status(201).send(model);
    } catch (error) {
        errorHandler(error, res);
    }
}

const getModels = async (req, res) => {
    try {
        const models = await Model.findAll({include: Brand});
        if (models.length === 0) {
            return res.status(404).send({ message: "Model is not available" });
        }
        return res.status(200).send(models);
    } catch (error) {
        errorHandler(error, res);
    }
}

const getModelById = async (req, res) => {
    try {
        const model = await Model.findByPk(req.params.id, {include: Brand});
        if (!model?.dataValues) {
            return res.status(404).send({ message: "Model not found" });
        }
        return res.status(200).send(model.dataValues);
    } catch (error) {
        errorHandler(error, res);
    }
}

const updateModel = async (req, res) => {
    try {

        const model = await Model.findByPk(req.params.id,{include: Brand});
        if (!model.dataValues) {
            return res.status(404).send({ message: "Model not found" });
        }
        const {error, value} = modelValidation(req.body);
        if(error){
            return errorHandler(error, res);
        }
        await model.update({ ...value });

        return res.status(200).send(model.dataValues);
    } catch (error) {
        errorHandler(error, res);
    }
}
const deleteModel = async (req, res) => {
    try {
        const model = await Model.findByPk(req.params.id);

        if (!model?.dataValues) {
            return res.status(404).send({ message: "Model not found" });
        }

        await model.destroy();
        return res.status(201).send({message : "Model deleted"});
    } catch (error) {
        errorHandler(error, res);
    }
}

module.exports = {
    createModel,
    getModels,
    getModelById,
    updateModel,
    deleteModel
}