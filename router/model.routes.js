const { createModel, getModels, getModelById, updateModel, deleteModel } = require("../controller/model.controller")
const adminGuard = require("../middleware/admin.guard")
const customerGuard = require("../middleware/customer.guard")


const router = require("express").Router()

router.post("/", adminGuard, createModel)
router.get("/", customerGuard, getModels)
router.get("/:id",customerGuard, getModelById)
router.put("/:id", adminGuard, updateModel)
router.delete("/:id", adminGuard, deleteModel)

module.exports = router