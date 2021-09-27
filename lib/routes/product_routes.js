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

routes.post("/categories/create", admAuth, (req, res) =>
  /*
    #swagger.description = 'Rota para criar uma nova categoria (login de administrador).'
    */
  CategoryController.create_category(req, res))

routes.delete("/categories/delete/:category_name", admAuth, (req, res) =>
  /*
      #swagger.description = 'Rota para excluir uma categoria (login de administrador).'
      */
  CategoryController.delete_category(req, res))

routes.post("/update/add-category", admAuth, (req, res) =>
  /*
      #swagger.description = 'Rota para adicionar uma categoria a um produto (login de administrador).'
      */
  CategoryController.add_product_category(req, res))

routes.post("/update/remove-category", admAuth, (req, res) =>
  /*
      #swagger.description = 'Rota para remover um produto de uma categoria (login de administrador, se o produto só possuir uma categoria ele é excluido também).'
      */
  CategoryController.remove_product_category(req, res))

routes.post("/create/:category_name", admAuth, (req, res) =>
  /*
      #swagger.description = 'Rota para criar um novo produdo e adiciona-lo a uma categoria (login de administrador). '
      */
  ProductController.create_product(req, res))

routes.delete("/delete/:product_id", admAuth, (req, res) =>
  /*
      #swagger.description = 'Rota para excluir um produto (login de administrador).'
      */
  ProductController.delete_product(req, res))

routes.put("/update/:product_id", admAuth, (req, res) =>
  /*
      #swagger.description = 'Rota para atualizar informações de um produto (login de administrador).'
      */
  ProductController.update_product(req, res))

routes.get("/get-product/:product_name", (req, res) =>
  /*
      #swagger.description = 'Rota para obter informações de um produto.'
      */
  ProductController.get_product(req, res))

routes.get("/get-all-products", (req, res) =>
  /*
      #swagger.description = 'Rota para obter todos os produtos cadastrados.'
      */
  ProductController.get_all_products(req, res))

routes.get("/get-products-by-category/:category_name", (req, res) =>
  /*
    #swagger.description = 'Rota para obter todos os produtos de uma determinada categoria.'
    */
  ProductController.get_products_by_category(req, res))

module.exports = routes;