const { createAdmin, getAdmins, getAdminById, updateAdmin, deleteAdmin, loginAdmin, logoutAdmin, refreshAdminToken } = require("../controller/admin.controller")
const adminGuard = require("../middleware/admin.guard")
const adminSelfGuard = require("../middleware/adminSelf.guard")
const superAdminGuard = require("../middleware/superAdmin.guard")

const router = require("express").Router()

router.post("/", adminGuard,superAdminGuard, createAdmin)
router.post("/login", loginAdmin)
router.get("/logout", adminGuard,logoutAdmin)
router.get("/refresh", adminGuard, refreshAdminToken)
router.get("/",adminGuard, getAdmins)
router.get("/:id",adminGuard , getAdminById)
router.put("/:id",adminGuard, adminSelfGuard, updateAdmin)
router.delete("/:id",adminGuard, adminSelfGuard, deleteAdmin)

module.exports = router