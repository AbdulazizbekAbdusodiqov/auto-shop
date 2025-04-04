import {
    createContract,
    getContracts,
    getContractById,
    updateContract,
    deleteContract,
    getSoldCarsDateRange,
} from '../controller/contract.controller.js';
import adminGuard from '../middleware/admin.guard.js';
import express from "express"
const router = express.Router()

router.post('/', adminGuard, createContract);
router.get('/', adminGuard, getContracts);
router.get('/:id', adminGuard, getContractById);
router.put('/:id', adminGuard, updateContract);
router.delete('/:id', adminGuard, deleteContract);
router.post('/soldcars', adminGuard, getSoldCarsDateRange)

export default router;