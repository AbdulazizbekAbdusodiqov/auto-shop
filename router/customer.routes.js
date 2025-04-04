import {
    getCustomer,
    createCustomer,
    getCustomerById,
    updateCustomer,
    deleteCustomer,
    loginCustomer,
    logoutCustomer,
    refreshCustomerToken,
    activateCustomer
} from "../controller/customer.controller.js"
import adminGuard from "../middleware/admin.guard.js"
import customerGuard from "../middleware/customer.guard.js"
import customerSelfGuard from "../middleware/customerSelf.guard.js"
import express from "express"
const router = express.Router()

router.post("/", createCustomer)
router.post("/login", loginCustomer)
router.get("/logout", logoutCustomer)
router.get("/activate/:link", activateCustomer)
router.get("/refresh", refreshCustomerToken)
router.get("/", adminGuard, getCustomer)
router.get("/:id", customerGuard, customerSelfGuard, getCustomerById)
router.put("/:id", customerGuard, customerSelfGuard, updateCustomer)
router.delete("/:id", adminGuard, deleteCustomer)

export default router