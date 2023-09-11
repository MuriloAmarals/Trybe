const express = require('express');
const { getAllProducts } = require('../controllers/Products');

const route = express.Router();

route.get('/', getAllProducts);

module.exports = route;
