module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define("Category", {
    category_name: DataTypes.STRING,
  });
  Category.associate = function (models) {
    Category.belongsToMany(models.Product, { through: "ProductHasCategory", foreignKey: "category_id", as: "product" });
  }
  return Category;
}