const validStatus = require('../services/ValideStatus');

const validateStatus = async (req, res, _next) => {
    const { id } = req.params;
    const { status } = req.body;
    const sale = await validStatus.validateStatus(id, status);
    return res.status(200).json(sale);
};

module.exports = { validateStatus };
