import express from "express"
const router = express.Router()

import adminRouter from "./admin.routes.js"
import banRouter from "./ban.routes.js"
import brandRouter from "./brand.routes.js"
import carRouter from "./car.routes.js"
import colorRouter from "./color.routes.js"
import contractRouter from "./contract.routes.js"
import customerRouter from "./customer.routes.js"
import modelRouter from "./model.routes.js"
import paymentRouter from "./payment.routes.js"
import planRouter from "./plan.routes.js"

router.use("/admin", adminRouter)
router.use("/customer", customerRouter)
router.use("/brand", brandRouter)
router.use("/model", modelRouter)
router.use("/color", colorRouter)
router.use("/car", carRouter)
router.use("/plan", planRouter)
router.use("/contract", contractRouter)
router.use("/payment", paymentRouter)
router.use("/ban", banRouter)

export default router