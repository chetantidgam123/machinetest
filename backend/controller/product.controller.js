const { ProductModel } = require("../model/product.model")


const getProds = async (req, res) => {
   let products = await ProductModel.find()
   return res.send(products)
}
const getProductById = async (req, res) => {
   let { id } = req.params;
   let product = await ProductModel.findOne({ _id: id });
   if (product) {
      return res.send({
         data: product,
         message: ""
      })
   } else {
      return res.status(404).send({
         message: "Data not found"
      })
   }
}

module.exports = {
   getProds,
   getProductById
}