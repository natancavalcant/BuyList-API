const { Router } = require("express");
const express = require("express");

const auth = require("../middlewares/auth_middleware")
const UserController = require("../controllers/user_controller")
const ProductListController = require("../controllers/product_list_controller")

const routes = express.Router();

routes.get("/", (req, res) => { res.json({ "message": "api on" }) });

routes.post("/create", (req, res) =>
  /*
    #swagger.description = 'Rota para cadastrar usuários.'
   */
  UserController.create_user(req, res));

routes.post("/auth", (req, res) =>
  /*
  #swagger.description = 'Rota para autenticação usuários (retorna o token).'
  */
  UserController.auth_user(req, res));

routes.get("/get/:user_id", auth, (req, res) =>
  /*
  #swagger.description = 'Rota para obter as informações do usuário (precisa passar o token do usuário logado).'
  */
  UserController.get_user(req, res));

// routes.get("/recovery-password/:username",
//   /*
//     #swagger.description = 'Rota para obter a chave de acesso do usuário.'
//     */
//   (req, res) => UserController.recovery_password(req, res));

routes.put("/update/:user_id", auth, (req, res) =>
  /*
  #swagger.description = 'Rota para alterar informações do usuário (precisa passar o token do usuário logado, passar nome de usuário e senha no corpo da requisição)'
  */
  UserController.update_user(req, res))

routes.delete("/delete/:user_id", auth, (req, res) =>
  /*
  #swagger.description = 'Rota para deletar usuário (precisa passar o token do usuário logado, e o id como parametro da requisição).'
  */
  UserController.delete_user(req, res));

routes.post("/:user_id/product-list/add-product", auth, (req, res) =>
  /*
  #swagger.description = 'Rota para adicionar um produto a lista do usuário (precisa passar o token do usuário logado).'
  */
  ProductListController.add_product_to_list(req, res))

routes.get("/:user_id/product-list", auth, (req, res) =>
  /*
  #swagger.description = 'Rota para obter os produtos na lista do usuário (precisa passar o token do usuário logado).'
  */
  ProductListController.get_product_list(req, res))

routes.get("/:user_id/product-list/:category_name", auth, (req, res) =>
  /*
  #swagger.description = 'Rota para produtos de uma categoria na lista do usuário (precisa passar o token do usuário logado).'
  */
  ProductListController.get_products_from_category(req, res))

routes.delete("/:user_id/product-list/remove-product/:product_id", auth, (req, res) =>
  /*
  #swagger.description = 'Rota para cadastrar remover um produto da lista do usuário passando o id na requisição. (precisa passar o token do usuário logado).'
  */
  ProductListController.remove_product_from_list(req, res))

routes.delete("/:user_id/product-list/remove-all-products", auth, (req, res) =>
  /*
  #swagger.description = 'Rota para remover todos os produtos da lista do usuário (precisa passar o token do usuário logado).'
  */
  ProductListController.remove_all_products_from_list(req, res))

routes.delete("/:user_id/product-list/remove-all-products-from-category/:category_name", auth, (req, res) =>
  /*
  #swagger.description = 'Rota para remover todos os produtos de uma determinada categoria (precisa passar o token do usuário logado).'
  */
  ProductListController.remove_all_products_from_category_in_list(req, res))

routes.post("/:user_id/product-list/add-product-quantity", auth, (req, res) =>
  /*
  #swagger.description = 'Rota para alterar as quantidades de um determinado produto (precisa passar o token do usuário logado).'
  */
  ProductListController.add_product_quantity(req, res))

module.exports = routes;