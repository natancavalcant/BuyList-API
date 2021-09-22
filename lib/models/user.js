'use strict';
require("dotenv/config");

const bcrypt = require("bcrypt");
const { password } = require("../../config/database");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    username: { type: DataTypes.STRING },
    password: DataTypes.STRING,
    is_adm: DataTypes.BOOLEAN,

  }, {});

  User.associate = function (models) {
    User.belongsToMany(models.Product, { through: "ProductList", foreignKey: "user_id", as: "product" });
  };
  User.beforeSave(async (user, options) => {
    if (user.password) {
      user.password = await bcrypt.hash(user.password, bcrypt.genSaltSync(8))
    }
  });

  return User;
}