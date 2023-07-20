const express = require("express");
const { getcart,addtocart, updateProd, removeProduct} = require("../controller/cart.controller");
let cartRouter = express.Router();
cartRouter.get("/getcart", getcart)
cartRouter.post("/addtocart", addtocart)
cartRouter.put("/updatecart/:id", updateProd)
cartRouter.delete("/removecart/:id", removeProduct)

module.exports = cartRouter