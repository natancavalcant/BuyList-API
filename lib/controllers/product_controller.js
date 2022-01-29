const { Product, Category } = require("../models");
const category = require("../models/category");

class ProductController {

  async create_product(req, res) {
    try {
      const { category_name } = req.params;
      const { product_name, url_image } = req.body;
      const category = await Category.findOne({ where: { category_name: category_name }, include: ["product"] });
      if (!category) {
        throw "Erro ao buscar categoria";
      }
      const product = await Product.create({ product_name: product_name.toLowerCase(), url_image: url_image });

      if (!product) {
        throw "Erro ao cadastrar";
      }

      await category.addProduct(product);

      res.status(200).json(product);
    } catch (err) {
      res.status(500).json({ "err": err });
    }
  }

  async update_product(req, res) {
    try {
      const { product_id } = req.params;
      const { product_name, url_image } = req.body;
      const product = await Product.findByPk(product_id);
      if (product == null) {
        throw "Erro ao encontrar produto";
      }

      await product.update({ product_name: product_name.toLowerCase(), url_image: url_image });
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json({ "err": err });
    }
  }

  async get_product(req, res) {
    try {
      const { product_name } = req.params;

      const product = await Product.findOne({
        where: { product_name: product_name },
        include: [
          {
            model: Category,
            as: "category",
            through: {
              attributes: []
            }
          }
        ]
      });
      if (product == null) {
        throw "produto não encontrado";
      }

      res.status(200).json(product);
    } catch (err) {
      res.status(500).json({ "err": err });
    }
  }
  async get_all_products(req, res) {
    try {
      const { limit = 100, offset = 0 } = req.query;
      console.log(limit)
      const { count, rows } = await Product.findAndCountAll({
        limit: limit,
        offset: offset,
        include: [
          {
            model: Category,
            as: "category",
            through: {
              attributes: []
            }
          }
        ],
        order: [
          ["id", "asc"]
        ]
      });

      if (!rows) {
        throw "nenhum produto encontrado";
      }

      res.status(200).json({ "length": count, products: rows });
    } catch (err) {
      res.status(500).json({ "err": err });
    }
  }

  async get_products_by_category(req, res) {

    try {
      const { limit = 100, offset = 0 } = req.query;
      const { category_name } = req.params;
      const { count, rows } = await Product.findAndCountAll({
        limit: limit,
        offset: offset,
        order: [
          ["id", "asc"]
        ],
        include: {
          model: Category,
          as: "category",
          where: { category_name: category_name },
          through: {
            attributes: []
          }
        },
      })

      if (!rows) {
        throw "nenhum produto encontrado";
      }

      res.status(200).json({ "length": count, "products": rows });
    } catch (err) {
      res.status(500).json({ "err": err });
    }
  }


  async delete_product(req, res) {
    try {
      const { product_id } = req.params;
      const product = await Product.findOne({ where: { id: product_id } });

      if (!product) {
        throw "usuário não encontrado!";
      }

      const productDeleted = await product.destroy();
      console.log(productDeleted);
      res.status(200).json({ ...productDeleted, deleted: true });
    } catch (err) {
      res.status(500).json({ "err": err });
    }
  }
}

module.exports = new ProductController();