const User = require('../models/User');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' })

const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = {email: "", password: ""};

    //incorrect email
    if(err.message === 'Email does not exist') {
        errors.email = 'Email not found';
        return errors;
    }
    if(err.message === 'invalid password') {
        errors.email = 'Incorrect password';
        return errors;
    }
    //Duplicate email
    if (err.code === 11000) {
        errors.email = 'That email is already in use';
        return errors;
    }

    // validation errors
    if (err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message
        });
    }
    return errors;
}

const maxAge = 3 * 24 * 60 *60
const createToken = (id) => {
    return jwt.sign({ id }, 'SECRET', {
        expiresIn: maxAge
    });
}

module.exports.login_get = (req,res) => {
    res.render('login');
};

module.exports.signup_get = (req,res) => {
    res.render('signup');
};

module.exports.login_post = async (req,res) => {
    const { email, password} = req.body;

    try {
        const user = await User.login(email, password);
        const token =  createToken(user._id);
        res.cookie('jwt', token, { maxAge: maxAge * 1000, httpOnly:true });
        res.status(200).json({ user: user._id });
    }
    catch(err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors })
    }
};

module.exports.signup_post = async(req,res) => {
    const { email, password, full_name } = req.body;
    
    try{
        const user = await User.create({ email, password, full_name });
        const token =  createToken(user._id);
        res.cookie('jwt', token , { maxAge: maxAge * 1000, httpOnly:true, admin:false });

        res.status(201).json({ user: user._id });
    }
    catch(err) {
        const errors = handleErrors(err)
        res.status(400).json({ errors });
    }
};


module.exports.logout = (req,res) => {
    res.cookie('jwt', '', {httpOnly:true, maxAge: 1 });
    res.cookie('admin', '', {httpOnly:true, maxAge: 1 });
    res.redirect('/');
}

module.exports.profile_get = (req,res) => {
    res.render('profile');
}
