const { getCustomer, createCustomer, getCustomerById, updateCustomer, deleteCustomer } = require("../controller/customer.controller")

const router = require("express").Router()

router.post("/", createCustomer)
router.get("/", getCustomer )
router.get("/:id", getCustomerById)
router.put("/:id", updateCustomer)
router.delete("/:id", deleteCustomer)

module.exports = router