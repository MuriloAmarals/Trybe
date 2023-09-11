const products = require('../services/Products');

const getAllProducts = async (_req, res, _next) => {
    const allProducts = await products.getAllProducts();
    return res.status(200).json(allProducts);
};

module.exports = { getAllProducts };
