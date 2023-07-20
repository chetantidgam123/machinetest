const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    title: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    qty:{ type: Number, required: true },
    category: { type: String, required: true },
})

const CartModel = mongoose.model('cartitems', cartSchema);
module.exports = { CartModel }