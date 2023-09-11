const salesOrders = require('../services/SalesOrders');

const salesUserbyId = async (req, res, _next) => {
        const { userId } = req.params;
        const ordersUser = await salesOrders.salesUserbyId(userId);
        return res.status(200).json(ordersUser);
};

const sellerById = async (req, res, _next) => {
        const { sellerId } = req.params;
        const seller = await salesOrders.sellerById(sellerId);
        return res.status(200).json(seller);
};

// commit testando

module.exports = { salesUserbyId, sellerById };
