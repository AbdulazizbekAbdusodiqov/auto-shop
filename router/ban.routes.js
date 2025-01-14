const { createBan, getBans, getBanById, updateBan, deleteBan } = require('../controller/ban.controller');

const routeer = require('express').Router();

routeer.post('/', createBan);
routeer.get('/', getBans);
routeer.get('/:id', getBanById);
routeer.put('/:id', updateBan);
routeer.delete('/:id', deleteBan);

module.exports = routeer;