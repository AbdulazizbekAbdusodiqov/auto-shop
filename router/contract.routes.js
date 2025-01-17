const { createContract, getContracts, getContractById, updateContract, deleteContract, getSoldCarsDateRange, getOverdueCustomers } = require('../controller/contract.controller');
const adminGuard = require('../middleware/admin.guard');

const router = require('express').Router();

router.post('/', adminGuard, createContract);
router.get('/', adminGuard, getContracts);
router.get('/:id', adminGuard, getContractById);
router.put('/:id', adminGuard, updateContract);
router.delete('/:id', adminGuard, deleteContract);
router.post('/soldcars', adminGuard, getSoldCarsDateRange )

module.exports = router;