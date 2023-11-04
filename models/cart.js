const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    product: {},
    buyerDetails: {},
    cartStatus: {},
    cartValue: {},
})

const Cart = mongoose.model('cart', cartSchema)

module.exports = Cart