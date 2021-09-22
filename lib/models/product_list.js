'use strict';

module.exports = (sequelize, DataTypes) => {
  const ProductList = sequelize.define("Product_list", {
    user_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER

  }, {});
  ProductList.associate = function (models) {
    ProductList.belongsTo(models.User, { foreignKey: "user_id" });
    ProductList.belongsTo(models.Product, { foreignKey: "product_id" });
  }
  return ProductList;
}