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
    cartValue: {
        type: Number,
        required: true,
        default: 0
    },
    cartStatus: {
        type: String,
        required: false,
        default: 'pending'
    },
})


const Cart = mongoose.model('cart', cartSchema)

module.exports = Cart