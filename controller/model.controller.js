const Model = require("../model/Model");

const createModel = async (req, res) => {
    try {
        const { name, brandId } = req.body;
        const model = await Model.create({ name, brandId });
        return res.status(201).send(model);
    } catch (error) {
        errorHandler(error, res);
    }
}

const getModels = async (req, res) => {
    try {
        const models = await Model.findAll();
        if (models?.dataValues?.length === 0) {
            return res.status(404).send({ message: "Model is not available" });
        }
        return res.status(200).send(models);
    } catch (error) {
        errorHandler(error, res);
    }
}

const getModelById = async (req, res) => {
    try {
        const model = await Model.findByPk(req.params.id);
        if (!model) {
            return res.status(404).send({ message: "Model not found" });
        }
        return res.status(200).send(model.dataValues);
    } catch (error) {
        errorHandler(error, res);
    }
}

const updateModel = async (req, res) => {
    try {
        const { name, brandId } = req.body;
        const model = await Model.findByPk(req.params.id);
        if (!model) {
            return res.status(404).send({ message: "Model not found" });
        }
        await model.update({ name, brandId });

        return res.status(200).send(model.dataValues);
    } catch (error) {
        errorHandler(error, res);
    }
}
const deleteModel = async (req, res) => {
    try {
        const model = await Model.findByPk(req.params.id);
        if (!model) {
            return res.status(404).send({ message: "Model not found" });
        }
        await model.destroy();
        return res.status(204).send({message : "Model deleted"});
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