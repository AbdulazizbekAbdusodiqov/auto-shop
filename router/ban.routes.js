import { createBan, getBans, getBanById, updateBan, deleteBan } from '../controller/ban.controller.js';
import adminGuard from '../middleware/admin.guard.js';
import express from "express"
const router = express.Router()

router.post('/',adminGuard, createBan);
router.get('/',adminGuard, getBans);
router.get('/:id',adminGuard, getBanById);
router.put('/:id',adminGuard, updateBan);
router.delete('/:id',adminGuard, deleteBan);

export default router;