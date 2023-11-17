const mongoose = require('mongoose')
const { isEmail } = require('validator')
const bcrypt = require('bcrypt');
const Admin = require('./admin')

const userSchema = new mongoose.Schema({
    full_name: {
        type: String,
        required: [true, 'username is required']
    },
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Minimum password length is 6 characters']
    },
    profile_photo: {
        type: String,
        required: false,
        default: 'https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png'
    },
    state: {
        type: String,
        required: false,
        default: 'user'
    }
});

userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    const admin = await Admin.findOne({ email })
  
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        return user; // Return the user if the password matches
      } else {
        throw Error('Invalid password');
      }
    }
  
      if (admin) {
        const adminAuth = await bcrypt.compare(password, admin.password);
        if (adminAuth) {
          return admin; // Return the admin if the password matches
        } else {
          throw Error('Invalid password');
        }
      }
      throw Error('Email does not exist');
    }
  

userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

const User = mongoose.model('user', userSchema);

module.exports = User;