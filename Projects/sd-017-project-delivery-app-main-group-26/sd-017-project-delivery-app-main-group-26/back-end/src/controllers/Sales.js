const { createSales, getUsersSeller, getSaleById } = require('../services/Sales');

const createSalesc = async (req, res) => {
    // const { id } = req.params;
    const sale = await createSales(req.body);
    res.status(201).json(sale);
};

const getUsersSellers = async (req, res, _next) => {
    const { role } = req.params;
    const sellerUser = await getUsersSeller(role);
    return res.status(200).json(sellerUser);
};

const getSaleByIdController = async (req, res, _next) => {
    const { id } = req.params;
    // console.log(req.params, 'req params');
    const saleId = await getSaleById(id);
    return res.status(200).json(saleId);
};

module.exports = { createSalesc, getUsersSellers, getSaleByIdController };