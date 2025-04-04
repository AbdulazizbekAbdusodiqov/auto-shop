import { createModel, getModels, getModelById, updateModel, deleteModel } from "../controller/model.controller.js"
import adminGuard from "../middleware/admin.guard.js"
import customerGuard from "../middleware/customer.guard.js"
import express from "express"
const router = express.Router()

router.post("/", adminGuard, createModel)
router.get("/", customerGuard, getModels)
router.get("/:id",customerGuard, getModelById)
router.put("/:id", adminGuard, updateModel)
router.delete("/:id", adminGuard, deleteModel)

export default router