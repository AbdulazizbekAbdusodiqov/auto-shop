const { createColor, getColors, getColorById, updateColor, deleteColor } = require("../controller/color.controller")
const adminGuard = require("../middleware/admin.guard")
const customerGuard = require("../middleware/customer.guard")


const router = require("express").Router()

router.post("/",adminGuard, createColor)
router.get("/", customerGuard, getColors)
router.get("/:id", customerGuard, getColorById)
router.put("/:id", adminGuard, updateColor)
router.delete("/:id", adminGuard, deleteColor)

module.exports = router