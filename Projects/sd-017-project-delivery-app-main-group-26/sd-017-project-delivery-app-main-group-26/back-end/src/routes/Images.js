const express = require('express');
const { getImages } = require('../controllers/Images');

const route = express.Router();

route.get('/:image', getImages);

module.exports = route;
