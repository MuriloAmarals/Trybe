const { Sale, SalesProduct, user, product } = require('../database/models');
const erroHandler = require('../errors');

const createSalesProducts = async (id, products) => {
  await Promise.all(products.map((item) => SalesProduct
  .create({ saleId: id, productId: item.id, quantity: item.quantity })));
};

const createSales = async ({
  totalPrice,
  deliveryAddress,
  deliveryNumber,
  userId,
  sellerId,
  products,
  }) => {
  const sale = await Sale.create({
    totalPrice,
    deliveryAddress,
    deliveryNumber,
    userId,
    sellerId,
    saleDate: Date.now(),
  });

  const { id } = sale.dataValues;

  await createSalesProducts(id, products);

  return sale;
};

const getUsersSeller = async (role) => {
const sellerUser = await user.findAll({ where: { role },
attributes: { exclude: ['password'] } }); 

  return sellerUser;
};

const getSaleById = async (id) => {
    const [sale] = await Sale.findAll({
      where: { id }, 
      include: [
      { model: product, as: 'products', through: { attributes: ['quantity'] } },
      { model: user, as: 'seller', attributes: { exclude: ['id', 'password', 'email', 'role'] } },
    ] }); 

    if (!sale) {
      throw erroHandler(404, 'Sale does not exist');
    }

    return sale; 
};

// const getSellerSales = async () {
//   const sellerSales = await Sale.
// };

module.exports = { createSales, getUsersSeller, getSaleById };
