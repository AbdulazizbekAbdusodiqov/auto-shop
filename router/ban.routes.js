const { createBan, getBans, getBanById, updateBan, deleteBan } = require('../controller/ban.controller');
const adminGuard = require('../middleware/admin.guard');

const routeer = require('express').Router();

routeer.post('/',adminGuard, createBan);
routeer.get('/',adminGuard, getBans);
routeer.get('/:id',adminGuard, getBanById);
routeer.put('/:id',adminGuard, updateBan);
routeer.delete('/:id',adminGuard, deleteBan);

module.exports = routeer;