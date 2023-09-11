const md5 = require('md5');
const { user } = require('../database/models');
const erroHandler = require('../errors');

const createUserAdmin = async ({ name, email, password, role }) => {
    const validPassword = md5(password);
    const searchUserAdmin = await user.findOne({ where: { name, email, role } });

    if (searchUserAdmin) {
        throw erroHandler(409, 'User already exists');
    }

    const createdUserAdmin = await user.create({ name, email, password: validPassword, role });

    if (!createdUserAdmin) {
        throw erroHandler(500, 'Invalid user');
    }
    const { password: hide, ...safeUser } = createdUserAdmin.dataValues;

    return safeUser;
};

const getAllUsers = async () => {
    const allUsers = await user.findAll();

    return allUsers;
};

const deleteUser = async (id) => {
     await user.destroy({ where: { id } });
};

module.exports = { createUserAdmin, getAllUsers, deleteUser };