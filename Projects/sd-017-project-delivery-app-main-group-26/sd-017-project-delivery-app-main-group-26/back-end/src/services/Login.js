const md5 = require('md5');
const { user } = require('../database/models');
const { createToken } = require('../utils/token');
const erroHandler = require('../errors');

const checkLogin = async ({ email, password }) => {
    const validPassword = md5(password);
    const validUser = await user.findOne({ where: { email, password: validPassword } });

    if (!validUser) {
        throw erroHandler(404, 'Invalid user');
    }  

    const { password: hide, ...safeUser } = validUser.dataValues;

    const token = createToken(safeUser);

    return { ...safeUser, token };
};

module.exports = { checkLogin };