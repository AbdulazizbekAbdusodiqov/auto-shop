const { createPlan, getPlans, getPlanById, updatePlan, deletePlan } = require("../controller/plan.controller")

const router = require("express").Router()

router.post("/", createPlan)
router.get("/", getPlans)
router.get("/:id", getPlanById)
router.put("/:id", updatePlan)
router.delete("/:id", deletePlan)

module.exports = router