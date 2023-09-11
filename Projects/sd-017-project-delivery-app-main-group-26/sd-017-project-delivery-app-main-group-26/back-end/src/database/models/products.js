'use strict';

module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define('product', 
{
    name: DataTypes.STRING,
    price: DataTypes.NUMBER,
    urlImage: DataTypes.STRING,
  }, {
    sequelize,
    timestamps: false,
    underscored: true
  }
)
  return Products;
};