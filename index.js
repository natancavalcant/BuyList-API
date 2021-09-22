process.env.NODE_ENV = "test";

const express = require("express");
require('dotenv').config({
  path: process.env.NODE_ENV === "test" ? ".env.testing" : ".env"
}
);
const user_routes = require("./lib/routes/user_routes");
const product_routes = require("./lib/routes/product_routes");
const { User, ProductList, Product, Category } = require("./lib/models");

const cors = require("cors");

const server = express()

server.use(cors())
server.use(express.json())
server.use(express.urlencoded({ extended: true }))

console.log(process.env.USERNAME_DB)

server.use("/users", user_routes);
server.use("/products", product_routes)


server.listen(3000)