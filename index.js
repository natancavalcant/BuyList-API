process.env.NODE_ENV = "production";

const express = require("express");
require('dotenv').config({
  path: process.env.NODE_ENV === "test" ? ".env.testing" : ".env"
}
);
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger/swagger_output.json');
const user_routes = require("./lib/routes/user_routes");
const product_routes = require("./lib/routes/product_routes");
const { User, ProductList, Product, Category } = require("./lib/models");

const cors = require("cors");

const server = express()

server.use(cors())
server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

console.log(process.env.USERNAME_DB)
server.get("/", (req, res) => {
  res.send("/docs to acess documentation!")
})
server.use("/users", user_routes);
server.use("/products", product_routes)


server.listen(3000)