const { createCar, getCars, getCarById, updateCar, deleteCar } = require("../controller/car.controller")
const adminGuard = require("../middleware/admin.guard")
const customerGuard = require("../middleware/customer.guard")

const router = require("express").Router()

router.post("/", adminGuard, createCar)
router.get("/", customerGuard, getCars)
router.get("/:id", customerGuard, getCarById)
router.put("/:id", adminGuard, updateCar)
router.delete("/:id", adminGuard, deleteCar)

module.exports = router