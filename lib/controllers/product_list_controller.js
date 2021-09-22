const { Product, User, Category, Product_list } = require("../models");
const Sequelize = require('sequelize');
const config = require('../../config/database.js');

const sequelize = new Sequelize(config);

class ProductListController {

  async add_product_to_list(req, res) {

    try {
      const { user_id } = req.params;
      const { product_id } = req.body;

      const user = await User.findOne(
        {
          where: { id: user_id },
          include:
          {
            model: Product,
            as: "product",
            through: {
              attributes: []
            }
          }
        }
      );

      if (!user) {
        throw "Erro ao encontrar usuário";
      }
      const product = await Product.findByPk(product_id)

      if (!product) {
        throw "Erro ao adcionar produto";
      }

      await user.addProduct(product);
      res.status(200).json({ "status": "added" });
    } catch (err) {
      res.status(500).json({ "err": err });
    }
  }
  async remove_product_from_list(req, res) {
    try {
      const { user_id, product_id } = req.params;
      const user = await User.findOne(
        {
          where: { id: user_id },
          include:
          {
            model:
              Product,
            as: "product",
            through: { attributes: [] }
          }
        });

      console.log(user);
      if (!user) {
        throw "Erro ao encontrar usuário";
      }
      const product = await Product.findByPk(product_id)
      if (!product) {
        throw "Erro ao encontrar produto";
      }

      await user.removeProduct(product);
      res.status(200).json({ "status": "removed" })

    } catch (err) {
      res.status(500).json({ "err": err });
    }
  }
  async remove_all_products_from_list(req, res) {
    try {
      const { user_id, product_id } = req.params;
      const user = await User.findOne(
        {
          where: { id: user_id },
          include:
          {
            model:
              Product,
            as: "product",
            through: { attributes: [] }
          }
        });

      if (!user) {
        throw "Erro ao encontrar usuário";
      }

      user.product.forEach(product => {
        user.removeProduct(product)
      })
      res.status(200).json({ "status": "removed" })

    } catch (err) {
      res.status(500).json({ "err": err });
    }
  }
  async remove_all_products_from_categorie_in_list(req, res) {
    try {
      const { user_id, category_name } = req.params;
      const user = await User.findOne(
        {
          where: { id: user_id },
          include:
          {
            model:
              Product,
            as: "product",
            include: {
              model: Category,
              as: "category",
              where: { category_name: category_name },
              through: { attributes: ["quantity"] }
            },
            through: { attributes: [] }
          }
        });

      if (!user) {
        throw "Erro ao encontrar usuário";
      }

      user.product.forEach(product => {
        user.removeProduct(product)
      })
      res.status(200).json({ "status": "removed" })

    } catch (err) {
      res.status(500).json({ "err": err });
    }
  }

  async get_product_list(req, res) {
    try {
      const { user_id } = req.params;
      const { limit = 100, offset = 0 } = req.query;

      const user = await User.findOne(
        {
          where: { id: user_id },
          limit: limit,
          offset: offset,
          include: {
            model: Product,
            as: "product",
            through: {
              attributes: ["quantity"]
            },
            include: {
              model: Category,
              as: "category",
              through: { attributes: [] },
            },
          }
        })

      if (!user) {
        throw "Falha ao buscar usuário no banco de dados";
      }
      const product = user.product;
      const count = await Product.count(
        {
          include: {
            model: User,
            as: "user",
            where: { id: user_id }
          }
        })

      res.status(200).json({ "length": count, products: product });
    } catch (err) {
      res.status(500).json({ "err": err });
    }
  }
  async get_products_from_category(req, res) {
    try {
      const { user_id, category_name } = req.params;
      const { limit, offset = 0 } = req.query;

      const user = await User.findOne(
        {
          where: { id: user_id },
          limit: limit,
          offset: offset,
          include: {
            model: Product,
            as: "product",
            through: {
              attributes: []
            },
            include: {
              model: Category,
              as: "category",
              where: { category_name: category_name },
              through: { attributes: [] },
            },
          }
        })

      if (!user) {
        throw "Produtos não encontrados";
      }
      const product = user.product
      const count = product.length;

      res.status(200).json({ "length": count, "products": product });
    } catch (err) {
      res.status(500).json({ "err": err });
    }
  }

  async add_product_quantity(req, res) {

    try {
      const { user_id } = req.params;
      const { quantity, product_id } = req.body;

      const product_in_list = await sequelize.query(
        "UPDATE public.\"ProductList\" SET quantity = " + quantity
        + "where public.\"ProductList\".\"user_id\"= " + user_id
        + " and \"ProductList\".\"product_id\"= " + product_id,
        { model: Product_list, mapToModel: true });

      if (!product_in_list) {
        throw "product not found"
      }
      const new_quantity = await sequelize.query(
        "SELECT quantity FROM public.\"ProductList\" where public.\"ProductList\".\"user_id\"= " + user_id
        + " and \"ProductList\".\"product_id\"= " + product_id,
        { model: Product_list, mapToModel: true }
      )
      res.status(200).json(new_quantity);
    } catch (err) {
      res.status(500).json({ "err": err });
    }
  }
}



module.exports = new ProductListController();