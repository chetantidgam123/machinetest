const { CartModel } = require("../model/cartItem.model");

const addtocart = async (req, res) => {
   try {
      const { title, price, category, image, description,qty} = req.body
      let exixting_prod = await CartModel.findOne({ title: title })
      if (exixting_prod) {
         return res.status(404).send({
            code: 404,
            message: "Similar Product Found Add Other Product"
         })
      }
      let product = await CartModel.create({ title: title, price: price, category: category, image: image, description: description,qty:qty });
      if (product) {
         return res.send({
            code: 200,
            data: product,
            status: true,
            message: "Product Added succefully"
         })
      } else {
         return res.send({
            code: 404,
            status: false,
            message: "Invalid details"
         })
      }
   } catch (error) {
      return res.send({
         code: 404,
         status: false,
         message: error
      })
   }
}

const updateProd = async (req, res) => {
   try {
      const { id } = req.params
      const { title, price, category, image, description,qty } = req.body
      let existing_prod = await CartModel.findOneAndUpdate({ _id: id },
         {
            '$set': {
               "title": title,
               "price": price,
               "category": category,
               "image": image,
               "description": description,
               "qty":qty
            },
         },
         { new: true }
      );

      if (existing_prod) {
         return res.send({
            code: 200,
            data: existing_prod,
            status: true,
            message: "Product Updated succefully"
         })
      } else {
         return res.send({
            code: 404,
            status: false,
            message: "Invalid details"
         })
      }
   } catch (error) {
      return res.send({
         code: 404,
         status: false,
         message: error
      })
   }
}


const removeProduct = async (req, res) => {
   try {
      const { id } = req.params;
      let deletedItem = await CartModel.findOneAndDelete({ _id: id }, { new: true })
      if (!deletedItem) {
         return res.status(404).send({
            code: 404,
            message: "Item Not found"
         })
      }
      return res.send({
         code: 200,
         message: "Item Removed Succesfully"
      })
   } catch (error) {
      return res.status(500).send({
         code: 500,
         message: error.error
      })
   }
}
const getcart = async (req, res) => {
   let products = await CartModel.find()
   return res.send(products)
}

module.exports = {
   getcart,
   addtocart,
   updateProd,
   removeProduct
}