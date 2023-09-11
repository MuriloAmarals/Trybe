const md5 = require('md5');
const { user } = require('../database/models');
const { createToken } = require('../utils/token');
const erroHandler = require('../errors');

const createUser = async ({ name, email, password }) => {
    const validPassword = md5(password);
    const searchUser = await user.findOne({ where: { name, email } });

    if (searchUser) {
        throw erroHandler(409, 'User already exists');
    }
    const role = 'customer';

    const createdUser = await user.create({ name, email, password: validPassword, role });

    if (!createdUser) {
        throw erroHandler(500, 'Invalid user');
    }
    const { password: hide, ...safeUser } = createdUser.dataValues;

    const token = createToken(safeUser);

    return { ...safeUser, token };
};

module.exports = { createUser };
