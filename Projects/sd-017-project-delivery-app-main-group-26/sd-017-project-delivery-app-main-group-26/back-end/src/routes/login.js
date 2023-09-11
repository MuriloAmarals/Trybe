const express = require('express');
const loginController = require('../controllers/Login');
const verifyToken = require('../middlewares/validateToken');

const route = express.Router();

route.post('/', loginController.login);
route.get('/validate', verifyToken.verifyToken);

module.exports = route;
