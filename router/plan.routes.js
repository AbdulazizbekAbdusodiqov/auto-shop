import { createPlan, getPlans, getPlanById, updatePlan, deletePlan } from "../controller/plan.controller.js"
import adminGuard from "../middleware/admin.guard.js"
import express from "express"
const router = express.Router()

router.post("/", adminGuard, createPlan)
router.get("/",  getPlans)
router.get("/:id", getPlanById)
router.put("/:id", adminGuard, updatePlan)
router.delete("/:id", adminGuard, deletePlan)

export default router