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

routes.post("/auth", (req, res) => UserController.auth_user(req, res));

routes.get("/get/:user_id", auth, (req, res) => UserController.get_user(req, res));

routes.put("/update/:user_id", auth, (req, res) => UserController.update_user(req, res))

routes.delete("/delete/:user_id", auth, (req, res) => UserController.delete_user(req, res));

routes.post("/:user_id/product-list/add-product", auth, (req, res) => ProductListController.add_product_to_list(req, res))

routes.get("/:user_id/product-list", auth, (req, res) => ProductListController.get_product_list(req, res))

routes.get("/:user_id/product-list/:category_name", auth, (req, res) => ProductListController.get_products_from_category(req, res))

routes.delete("/:user_id/product-list/remove-product/:product_id", auth, (req, res) => ProductListController.remove_product_from_list(req, res))

routes.delete("/:user_id/product-list/remove-all-products", auth, (req, res) => ProductListController.remove_all_products_from_list(req, res))

routes.delete("/:user_id/product-list/remove-all-products-from-category/:category_name", auth, (req, res) => ProductListController.remove_all_products_from_categorie_in_list(req, res))

routes.post("/:user_id/product-list/add-product-quantity", auth, (req, res) => ProductListController.add_product_quantity(req, res))

module.exports = routes;