const express = require('express');
const salesUserbyId = require('../controllers/SalesOrders');

const route = express.Router({ mergeParams: true });

route.get('/', salesUserbyId.salesUserbyId);

module.exports = route;
