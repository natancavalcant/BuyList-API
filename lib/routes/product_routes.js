const { Router } = require("express");
const express = require("express");


const ProductController = require("../controllers/product_controller");
const CategoryController = require("../controllers/category_controller");
const admAuth = require("../middlewares/adm_auth_middleware")


const routes = express.Router();

routes.get("/categories", (req, res) =>
  /*
  #swagger.description = 'Rota para obter todas as categorias cadastradas.'
  */
  CategoryController.get_categories(req, res)
)

routes.post("/categories/create", admAuth, (req, res) => CategoryController.create_category(req, res))

routes.delete("/categories/delete/:category_name", admAuth, (req, res) => CategoryController.delete_category(req, res))

routes.post("/update/add-category", admAuth, (req, res) => CategoryController.add_product_category(req, res))

routes.post("/update/remove-category", admAuth, (req, res) => CategoryController.remove_product_category(req, res))

routes.post("/create/:category_name", admAuth, (req, res) => ProductController.create_product(req, res))

routes.delete("/delete/:product_id", admAuth, (req, res) => ProductController.delete_product(req, res))

routes.put("/update/:product_id", admAuth, (req, res) => ProductController.update_product(req, res))

routes.get("/get-product/:product_name", (req, res) => ProductController.get_product(req, res))

routes.get("/get-all-products", (req, res) => ProductController.get_all_products(req, res))

routes.get("/get-products-by-category/:category_name", (req, res) => ProductController.get_products_by_category(req, res))

module.exports = routes;