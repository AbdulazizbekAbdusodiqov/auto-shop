const { createPayment, getPayments, getPaymentById, updatePayment, deletePayment } = require("../controller/payment.controller")

const router = require("express").Router()

router.post("/", createPayment)
router.get("/", getPayments)
router.get("/:id", getPaymentById)
router.put("/:id", updatePayment)
router.delete("/:id", deletePayment)

module.exports = router