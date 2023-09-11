const { Sale, product, user } = require('../database/models');

const validateStatus = async (id, status) => {
    await Sale.update({ status }, { where: { id } });
    
    const newSale = await Sale.findOne({
      where: { id },
      include: [
        { model: product, as: 'products', through: { attributes: ['quantity'] } },
        { model: user, as: 'seller', attributes: { exclude: ['id', 'password', 'email', 'role'] } },
      ],
    });

    return newSale;
};

module.exports = { validateStatus };
