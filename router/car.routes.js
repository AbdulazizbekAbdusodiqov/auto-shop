const { createCar, getCars, getCarById, updateCar, deleteCar } = require("../controller/car.controller")

const router = require("express").Router()

router.post("/", createCar)
router.get("/", getCars)
router.get("/:id", getCarById)
router.put("/:id", updateCar)
router.delete("/:id", deleteCar)

module.exports = router