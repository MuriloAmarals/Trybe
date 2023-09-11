const express = require('express');
const validStatus = require('../controllers/ValideStatus');

const route = express.Router({ mergeParams: true });

route.put('/', validStatus.validateStatus);

module.exports = route;
