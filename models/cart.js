const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    product: {
        type: [String]
    },
    buyerDetails: {},
    cartStatus: {},
    cartValue: {},
})

const Cart = mongoose.model('cart', cartSchema)

module.exports = Cart