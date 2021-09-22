module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", {
    product_name: DataTypes.STRING,
    url_image: DataTypes.STRING,
  });

  Product.associate = function (models) {
    Product.belongsToMany(models.Category, { through: "ProductHasCategory", foreignKey: "product_id", as: "category" })
    Product.belongsToMany(models.User, { through: "ProductList", foreignKey: "product_id", as: "user" });
  }
  return Product;
}