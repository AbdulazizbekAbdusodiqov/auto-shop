const {
    getCustomer,
    createCustomer,
    getCustomerById,
    updateCustomer,
    deleteCustomer,
    loginCustomer,
    logoutCustomer,
    refreshCustomerToken,
    activateCustomer

} = require("../controller/customer.controller")
const adminGuard = require("../middleware/admin.guard")
const customerGuard = require("../middleware/customer.guard")
const customerSelfGuard = require("../middleware/customerSelf.guard")

const router = require("express").Router()

router.post("/", createCustomer)
router.post("/login", loginCustomer)
router.get("/logout", logoutCustomer)
router.get("/activate/:link", activateCustomer)
router.get("/refresh",customerGuard, refreshCustomerToken)
router.get("/", customerGuard, getCustomer)
router.get("/:id", customerGuard, getCustomerById)
router.put("/:id", customerGuard, customerSelfGuard, updateCustomer)
router.delete("/:id", adminGuard, deleteCustomer)

module.exports = router