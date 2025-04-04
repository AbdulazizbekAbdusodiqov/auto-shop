import { createBrand, getBrands, getBrandById, updateBrand, deleteBrand } from "../controller/brand.controller.js"
import adminGuard from "../middleware/admin.guard.js"
import customerGuard from "../middleware/customer.guard.js"

import express from "express"
const router = express.Router()

router.post("/", adminGuard,createBrand)
router.get("/",customerGuard, getBrands)
router.get("/:id", customerGuard, getBrandById)
router.put("/:id", adminGuard, updateBrand)
router.delete("/:id",adminGuard, deleteBrand)

export default router