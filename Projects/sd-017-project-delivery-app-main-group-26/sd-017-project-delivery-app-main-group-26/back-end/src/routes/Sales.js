const express = require('express');
const createSalesc = require('../controllers/Sales');
const saleById = require('../controllers/Sales');

const route = express.Router({ mergeParams: true });

route.post('/', createSalesc.createSalesc);
route.get('/', saleById.getSaleByIdController);

module.exports = route;
