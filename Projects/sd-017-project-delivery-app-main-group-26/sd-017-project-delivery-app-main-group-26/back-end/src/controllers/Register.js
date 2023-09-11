const { createUser } = require('../services/Register');

const register = async (req, res, _next) => {
    const newUser = await createUser(req.body);
    return res.status(201).json(newUser);
};

module.exports = { register };
