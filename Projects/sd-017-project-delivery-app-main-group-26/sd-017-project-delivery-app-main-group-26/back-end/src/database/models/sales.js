'use strict';

module.exports = (sequelize, DataTypes) => {
    const Sales = sequelize.define('Sale', 
    {
      userId: {type: DataTypes.INTEGER, foreignKey: true},
      sellerId: {type: DataTypes.INTEGER, foreignKey: true},
      totalPrice: DataTypes.DECIMAL(9,2),
      deliveryAddress: DataTypes.STRING,
      deliveryNumber: DataTypes.STRING,
      saleDate: DataTypes.DATE,
      status: DataTypes.STRING,
   }, {
      sequelize,
      tableName: 'sales',
      timestamps: false,
      underscored: true
    }
  ) 

  Sales.associate = (models) => {
    Sales.belongsTo(models.user, {
       foreignKey:'userId', as: 'user'
     })
     Sales.belongsTo(models.user, {
       foreignKey: 'sellerId', as: 'seller'
     })    
   };

  return Sales;
};