import { createPayment, getPayments, getPaymentById, updatePayment, deletePayment } from "../controller/payment.controller.js"
import adminGuard from "../middleware/admin.guard.js"
import express from "express"
const router = express.Router()

router.post("/", adminGuard, createPayment)
router.get("/", adminGuard, getPayments)
router.get("/:id", adminGuard, getPaymentById)
router.put("/:id", adminGuard, updatePayment)
router.delete("/:id", adminGuard, deletePayment)

export default router