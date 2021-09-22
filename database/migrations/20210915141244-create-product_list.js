'use strict';

const { DataTypes } = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("ProductList", {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        primaryKey: true,
      },

      product_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: 'Products',
          key: 'id'
        }
      },

      user_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: 'Users',
          key: 'id'
        }
      },

      quantity: {
        defaultValue: 1,
        allowNull: false,
        type: DataTypes.INTEGER,
      },

      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },

      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },

    })

  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("ProductList");
  }
};
