const { checkLogin } = require('../services/Login');

const login = async (req, res, _next) => {
  const newUser = await checkLogin(req.body);
  return res.status(200).json(newUser);
};

module.exports = { login };
