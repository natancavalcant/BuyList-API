const { Router } = require("express");
const express = require("express");


const ProductController = require("../controllers/product_controller");
const CategoryController = require("../controllers/category_controller");
const admAuth = require("../middlewares/adm_auth_middleware")


const routes = express.Router();

routes.get("/categories", 
  /*
  #swagger.description = 'Rota para obter todas as categorias cadastradas.'
  */
  CategoryController.get_categories
)

routes.post("/categories/create", admAuth, 
  /*
    #swagger.description = 'Rota para criar uma nova categoria (login de administrador).'
    */
  CategoryController.create_category)

routes.delete("/categories/delete/:category_name", admAuth, 
  /*
      #swagger.description = 'Rota para excluir uma categoria (login de administrador).'
      */
  CategoryController.delete_category)

routes.post("/update/add-category", admAuth, 
  /*
      #swagger.description = 'Rota para adicionar uma categoria a um produto (login de administrador).'
      */
  CategoryController.add_product_category)

routes.post("/update/remove-category", admAuth, 
  /*
      #swagger.description = 'Rota para remover um produto de uma categoria (login de administrador, se o produto só possuir uma categoria ele é excluido também).'
      */
  CategoryController.remove_product_category)

routes.post("/create/:category_name", admAuth, 
  /*
      #swagger.description = 'Rota para criar um novo produdo e adiciona-lo a uma categoria (login de administrador). '
      */
  ProductController.create_product)

routes.delete("/delete/:product_id", admAuth, 
  /*
      #swagger.description = 'Rota para excluir um produto (login de administrador).'
      */
  ProductController.delete_product)

routes.put("/update/:product_id", admAuth, 
  /*
      #swagger.description = 'Rota para atualizar informações de um produto (login de administrador).'
      */
  ProductController.update_product)

routes.get("/get-product/:product_name", 
  /*
      #swagger.description = 'Rota para obter informações de um produto.'
      */
  ProductController.get_product)

routes.get("/get-all-products", 
  /*
      #swagger.description = 'Rota para obter todos os produtos cadastrados.'
      */
  ProductController.get_all_products)

routes.get("/get-products-by-category/:category_name", 
  /*
    #swagger.description = 'Rota para obter todos os produtos de uma determinada categoria.'
    */
  ProductController.get_products_by_category)

module.exports = routes;