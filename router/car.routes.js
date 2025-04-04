import { createCar, getCars, getCarById, updateCar, deleteCar } from "../controller/car.controller.js"
import adminGuard from "../middleware/admin.guard.js"
import express from "express"
const router = express.Router()

router.post("/", adminGuard, createCar)
router.get("/",  getCars)
router.get("/:id",  getCarById)
router.put("/:id", adminGuard, updateCar)
router.delete("/:id", adminGuard, deleteCar)

export default router