'use strict'

module.exports = (sequelize, DataTypes) => {
  const SalesProducts = sequelize.define('SalesProduct', {
        saleId: {
          type: DataTypes.INTEGER,
          foreignKey: true,
          primaryKey: true,
        },
        productId: {
          type: DataTypes.INTEGER,
          foreignKey: true,
          primaryKey: true,
        },
        quantity: DataTypes.NUMBER
      }, {
        sequelize,
        timestamps: false,
        underscored: true
      });
      SalesProducts.associate = (models) => {
        models.Sale.belongsToMany(models.product, {
          foreignKey: 'sale_id', as: 'products',
          otherKey: 'product_id', through: SalesProducts
        })
        models.product.belongsToMany(models.Sale, {
          foreignKey: 'product_id', as: 'sales',
          otherKey: 'sale_id', through: SalesProducts
        }) 
      }
      return SalesProducts;
};
