const { createPlan, getPlans, getPlanById, updatePlan, deletePlan } = require("../controller/plan.controller")
const adminGuard = require("../middleware/admin.guard")
const customerGuard = require("../middleware/customer.guard")

const router = require("express").Router()

router.post("/", adminGuard, createPlan)
router.get("/",  getPlans)
router.get("/:id", getPlanById)
router.put("/:id", adminGuard, updatePlan)
router.delete("/:id", adminGuard, deletePlan)

module.exports = router