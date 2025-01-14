const { createContract, getContracts, getContractById, updateContract, deleteContract } = require('../controller/contract.controller');

const router = require('express').Router();

router.post('/', createContract);
router.get('/', getContracts);
router.get('/:id', getContractById);
router.put('/:id', updateContract);
router.delete('/:id', deleteContract);

module.exports = router;