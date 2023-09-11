const express = require('express');
const sellerbyId = require('../controllers/SalesOrders');

const route = express.Router({ mergeParams: true });

route.get('/', sellerbyId.sellerById);

module.exports = route;
