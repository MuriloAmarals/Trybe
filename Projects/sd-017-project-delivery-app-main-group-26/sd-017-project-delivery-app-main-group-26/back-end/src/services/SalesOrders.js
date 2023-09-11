const { Sale } = require('../database/models');

const salesUserbyId = async (userId) => {
    const orders = await Sale.findAll({ where: { userId },
    });
    return orders;
};

const sellerById = async (sellerId) => {
    const seller = await Sale.findAll({ where: { sellerId },
    });
    return seller;
};

module.exports = { salesUserbyId, sellerById };
