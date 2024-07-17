const mongoose = require('mongoose');
const { isEmail } = require('validator');

const newsLetterSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    }
});

const NewsLetter = mongoose.model('NewsLetter', newsLetterSchema);

module.exports = NewsLetter;