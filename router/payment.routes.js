const { createPayment, getPayments, getPaymentById, updatePayment, deletePayment } = require("../controller/payment.controller")
const adminGuard = require("../middleware/admin.guard")

const router = require("express").Router()

router.post("/", adminGuard, createPayment)
router.get("/", adminGuard, getPayments)
router.get("/:id", adminGuard, getPaymentById)
router.put("/:id", adminGuard, updatePayment)
router.delete("/:id", adminGuard, deletePayment)

module.exports = router