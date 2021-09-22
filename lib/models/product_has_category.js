module.exports = (sequelize, DataTypes) => {
  const ProductHasCategory = sequelize.define("HasCategory", {
    product_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER,

  }, {});
  ProductHasCategory.associate = function (models) {
    ProductHasCategory.belongsTo(models.Category, { foreignKey: "category_id" });
    ProductHasCategory.belongsTo(models.Product, { foreignKey: "product_id" });
  }
  return ProductHasCategory;
}