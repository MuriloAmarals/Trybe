const express = require('express');
const { register } = require('../controllers/Register');

const route = express.Router();

route.post('/', register);

module.exports = route;
