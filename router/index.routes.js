const router = require("express").Router()
const adminRouter = require("./admin.routes")
const customerRouter = require("./customer.routes")


router.use("/admin", adminRouter)
router.use("/customer", customerRouter)


module.exports = router