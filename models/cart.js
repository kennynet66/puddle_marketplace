const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    products: {
        type: [String],
        required: true
    },
    buyerDetails: {
        type: String,
        required: true
    },
    cartStatus: {
        type: String,
        required: true
    },
})

const Cart = mongoose.model('cart', cartSchema)

module.exports = Cart