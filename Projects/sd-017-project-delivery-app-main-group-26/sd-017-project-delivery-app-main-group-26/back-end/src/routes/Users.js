const express = require('express');
const users = require('../controllers/Users');
const validateTokenAdmin = require('../middlewares/validateTokenAdmin');

const route = express.Router();

route.post('/', users.createUserAdminController);
route.get('/', users.getAllUsers);
route.delete('/delete/:id', validateTokenAdmin.verifyToken, users.deleteUser);

module.exports = route;
