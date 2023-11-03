const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const adminSchema = new mongoose.Schema({
    full_name: {
        type: String,
        required: [true, 'Please input admin full name'],
        unique: true,
        lowercase: true
    },
    email :{
        type: String,
        required: [true, 'Please input email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please input a password']
    },
    profile_photo: {
        type: String,
        required: false,
        default: 'https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png'
    },
    state: {
        type: String,
        required: false,
        default: 'admin'
    }
})

//hash password before storing to the db
adminSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})


//login logic
adminSchema.statics.adminlogin = async function(email, password) {
    const admin = await this.findOne({ email });

    if (admin) {
        const auth = await bcrypt.compare(password, admin.password);
        if(auth) {
            return admin;
        }
        throw Error('invalid password');
    }
    throw Error('Email does not exist');
}

const Admin = mongoose.model('admin', adminSchema);

module.exports = Admin;