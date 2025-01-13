const { createColor, getColors, getColorById, updateColor, deleteColor } = require("../controller/color.controller")


const router = require("express").Router()

router.post("/", createColor)
router.get("/", getColors)
router.get("/:id", getColorById)
router.put("/:id", updateColor)
router.delete("/:id", deleteColor)

module.exports = router