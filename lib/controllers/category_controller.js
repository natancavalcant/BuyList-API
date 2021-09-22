const { Product, Category } = require("../models");

class CategoryController {
  async get_categories(req, res) {
    try {
      const categories = await Category.findAll();
      if (!categories) {
        throw "Nenhuma categoria encontrada";
      }
      res.status(200).json(categories);
    } catch (err) {
      res.status(500).json({ "err": err });
    }
  }
  async create_category(req, res) {
    try {
      const { category_name } = req.body;

      const category = await Category.findOne({ where: { category_name: category_name } });

      if (category != null) {
        throw "Categoria já existe";
      }

      const newCategory = await Category.create({ category_name: category_name.toLowerCase() });

      res.status(200).json(newCategory)
    } catch (err) {
      res.status(500).json({ "err": err })
    }
  }
  async delete_category(req, res) {
    try {
      const { category_name } = req.params;

      const category = await Category.findOne({ where: { category_name: category_name } });


      if (!category) {
        throw "categoria não encontrada";
      }

      const categoryDeleted = await category.destroy()

      res.status(200).json({ ...categoryDeleted, deleted: true })
    } catch (err) {
      res.status(500).json({ "err": err })
    }
  }

  async add_product_category(req, res) {
    try {
      const { category_name, product_name } = req.body;
      const product = await Product.findOne({
        where: { product_name: product_name }, include: {
          model: Category,
          as: "category",
          through: {
            attributes: []
          }
        }
      });
      const category = await Category.findOne({ where: { category_name: category_name } });

      if (!category || !product) {
        throw "Erro ao adicionar categoria";
      }

      await product.addCategory(category);

      res.status(200).json({ "status": "added" });
    } catch (err) {
      res.status(500).json({ "err": err })
    }
  }
  async remove_product_category(req, res) {
    try {
      const { category_name, product_name } = req.body;
      const product = await Product.findOne({
        where: { product_name: product_name }, include: {
          model: Category,
          as: "category",
          through: {
            attributes: []
          }
        }
      });
      const category = await Category.findOne({ where: { category_name: category_name } });

      if (!category || !product) {
        throw "Erro ao remover categoria";
      }

      await product.removeCategory(category);

      res.status(200).json({ "status": "removed" });
    } catch (err) {
      res.status(500).json({ "err": err })
    }
  }
}
module.exports = new CategoryController();