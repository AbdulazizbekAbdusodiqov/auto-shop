import { createAdmin, getAdmins, getAdminById, updateAdmin, deleteAdmin, loginAdmin, logoutAdmin, refreshAdminToken, activateAdmin } from "../controller/admin.controller.js"
import adminGuard from "../middleware/admin.guard.js"
import adminSelfGuard from "../middleware/adminSelf.guard.js"
import superAdminGuard from "../middleware/superAdmin.guard.js"
import express from "express"
const router = express.Router()

router.post("/", createAdmin)
router.post("/login", loginAdmin)
router.get("/logout", logoutAdmin)
router.get("/activate/:link", activateAdmin)
router.get("/refresh", adminGuard, refreshAdminToken)
router.get("/",adminGuard, superAdminGuard, getAdmins)
router.get("/:id",adminGuard , adminSelfGuard ,getAdminById)
router.put("/:id",adminGuard, adminSelfGuard, updateAdmin)
router.delete("/:id",adminGuard, adminSelfGuard, deleteAdmin)

export default router