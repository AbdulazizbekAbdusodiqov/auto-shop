const { createAdmin, getAdmins, getAdminById, updateAdmin, deleteAdmin, loginAdmin, logoutAdmin, refreshAdminToken, activateAdmin } = require("../controller/admin.controller")
const adminGuard = require("../middleware/admin.guard")
const adminSelfGuard = require("../middleware/adminSelf.guard")
const superAdminGuard = require("../middleware/superAdmin.guard")

const router = require("express").Router()

router.post("/", adminGuard,superAdminGuard, createAdmin)
router.post("/login", loginAdmin)
router.get("/logout", logoutAdmin)
router.get("/activate/:link", activateAdmin)
router.get("/refresh", adminGuard, refreshAdminToken)
router.get("/",adminGuard, superAdminGuard, getAdmins)
router.get("/:id",adminGuard , adminSelfGuard ,getAdminById)
router.put("/:id",adminGuard, adminSelfGuard, updateAdmin)
router.delete("/:id",adminGuard, adminSelfGuard, deleteAdmin)

module.exports = router