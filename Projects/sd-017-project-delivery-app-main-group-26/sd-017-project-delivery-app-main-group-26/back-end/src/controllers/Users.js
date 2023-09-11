const users = require('../services/Users');

const createUserAdminController = async (req, res, _next) => {
    const newUserAdmin = await users.createUserAdmin(req.body);
    return res.status(201).json(newUserAdmin);
};

const getAllUsers = async (_req, res, _next) => {
    const allUsers = await users.getAllUsers();
    return res.status(200).json(allUsers);
};

const deleteUser = async (req, res, _next) => {
    const { id } = req.params;
     await users.deleteUser(id);
    return res.status(204).end();
};

module.exports = { createUserAdminController, getAllUsers, deleteUser };
