const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    item_name: {
        type: String,
        required: [true, 'item name required']
    },
    price: {
        type: Number,
        required: [true, 'item price required']
    },
    photo: {
        type: String,
        required: [true, 'photo required']
    },
    description: {
        type: String,
        required: [true, ' item description required']
    },
    category: {
        type: String,
        required: [true, 'item category required']
    },
    author: {
        type: String,
        required: [true, 'Author is required']
    }
});

const Item = mongoose.model('item', itemSchema);

module.exports = Item;