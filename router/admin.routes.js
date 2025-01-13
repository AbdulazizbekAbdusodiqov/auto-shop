const { createAdmin, getAdmins, getAdminById, updateAdmin, deleteAdmin } = require("../controller/admin.controller")

const router = require("express").Router()

router.post("/", createAdmin)
router.get("/", getAdmins)
router.get("/:id", getAdminById)
router.put("/:id", updateAdmin)
router.delete("/:id", deleteAdmin)

module.exports = router