import {
    createColor,
    getColors,
    getColorById,
    updateColor,
    deleteColor
} from "../controller/color.controller.js"
import adminGuard from "../middleware/admin.guard.js"
import customerGuard from "../middleware/customer.guard.js"
import express from "express"
const router = express.Router()

router.post("/", adminGuard, createColor)
router.get("/", customerGuard, getColors)
router.get("/:id", customerGuard, getColorById)
router.put("/:id", adminGuard, updateColor)
router.delete("/:id", adminGuard, deleteColor)

export default router