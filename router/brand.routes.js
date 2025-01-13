const { createBrand, getBrands, getBrandById, updateBrand, deleteBrand } = require("../controller/brand.controller")


const router = require("express").Router()

router.post("/", createBrand)
router.get("/", getBrands)
router.get("/:id", getBrandById)
router.put("/:id", updateBrand)
router.delete("/:id", deleteBrand)

module.exports = router