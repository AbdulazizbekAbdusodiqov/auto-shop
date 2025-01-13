const { createModel, getModels, getModelById, updateModel, deleteModel } = require("../controller/model.controller")


const router = require("express").Router()

router.post("/", createModel)
router.get("/", getModels)
router.get("/:id", getModelById)
router.put("/:id", updateModel)
router.delete("/:id", deleteModel)

module.exports = router