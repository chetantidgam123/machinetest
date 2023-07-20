const express = require("express");
const { getProds, getProductById } = require("../controller/product.controller");
let productRouter = express.Router();
productRouter.get("/products", getProds)
productRouter.get("/product/:id", getProductById)

module.exports = productRouter