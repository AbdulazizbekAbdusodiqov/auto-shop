const router = require("express").Router()
const adminRouter = require("./admin.routes")
const customerRouter = require("./customer.routes")
const brandRouter = require("./brand.routes")
const modelRouter = require("./model.routes")

router.use("/admin", adminRouter)
router.use("/customer", customerRouter)
router.use("/brand", brandRouter)
router.use("/model", modelRouter)

module.exports = router