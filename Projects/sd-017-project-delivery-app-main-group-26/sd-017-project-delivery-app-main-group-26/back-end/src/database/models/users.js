'use strict'

module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define('user',{
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.STRING
    }, {
      sequelize,
      timestamps: false,
    });
   
     Users.associate = (models) => {
     Users.hasMany(models.Sale, {
        foreignKey:'userId', as: 'orders'
      })
      Users.hasMany(models.Sale, {
        foreignKey: 'sellerId', as: 'sales'
      })    
    }
  return Users;
}
