const { createBrand, getBrands, getBrandById, updateBrand, deleteBrand } = require("../controller/brand.controller")
const adminGuard = require("../middleware/admin.guard")
const customerGuard = require("../middleware/customer.guard")


const router = require("express").Router()

router.post("/", adminGuard,createBrand)
router.get("/",customerGuard, getBrands)
router.get("/:id", customerGuard, getBrandById)
router.put("/:id", adminGuard, updateBrand)
router.delete("/:id",adminGuard, deleteBrand)

module.exports = router