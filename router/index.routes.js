const router = require("express").Router()

const adminRouter = require("./admin.routes")
const customerRouter = require("./customer.routes")
const brandRouter = require("./brand.routes")
const modelRouter = require("./model.routes")
const carRouter = require("./car.routes")
const planRouter = require("./plan.routes")
const contractRouter = require("./contract.routes")

router.use("/admin", adminRouter)
router.use("/customer", customerRouter)
router.use("/brand", brandRouter)
router.use("/model", modelRouter)
router.use("/car", carRouter)
router.use("/plan", planRouter)
router.use("/contract", contractRouter)

module.exports = router