const express = require('express');
const getUsersSeller = require('../controllers/Sales');

const route = express.Router({ mergeParams: true });

route.get('/', getUsersSeller.getUsersSellers);

module.exports = route;
