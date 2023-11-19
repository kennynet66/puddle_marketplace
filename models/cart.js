const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    products: {
        type: String,
        required: true
    },
    cartStatus: {
        type: String,
        required: true,
        default: 'pending'
    },
    cartValue: {
        type: Number,
        required: true,
        default: 0
    }
})

cartSchema.pre('save', async function(next) {
    try {
        const existingCart = await mongoose.model('cart').findOne({ user: this.user });

        if (existingCart) {
            console.log('Cart found:', existingCart);
        } else {
            console.log('Cart does not exist');
        }

        next(); // Call next() after the asynchronous operation is complete
    } catch (err) {
        console.error(err);
        next(err); // Pass the error to the next middleware
    }
});

const Cart = mongoose.model('cart', cartSchema)

module.exports = Cart