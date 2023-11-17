// import the required modules
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' })

// Handle signup and login errors
const handleErrors = (err) => {
    // initialize the error objects
    let errors = { email: "", password: "" };

    //incorrect email or email is not registered
    if (err.message === 'Email does not exist') {
        errors.email = 'Email not found';
        return errors;
    }
    if (err.message === 'invalid password') {
        errors.email = 'Incorrect password';
        return errors;
    }
    // Handle duplicate emails
    if (err.code === 11000) {
        errors.email = 'That email is already in use';
        return errors;
    }

    // validation errors
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message
        });
    }
    return errors;
}

// Token validity time
const maxAge = 3 * 24 * 60 * 60
// Create a json web token for user authentication
const createToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET, {
        expiresIn: maxAge
    });
}
const createAdminToken = (id) => {
    return jwt.sign({ id }, process.env.ADMINSECRET, {
        expiresIn: maxAge
    })
}

// Render the login view
module.exports.login_get = (req, res) => {
    res.render('login');
};

// Render the signup view
module.exports.signup_get = (req, res) => {
    res.render('signup');
};

// Handle post requests to login a user
module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);
        // Check if the email belongs to a user or an admin
        if (user.state != "admin") {
            const token = createToken(user._id);
            // Create an authentication cookie for the user
            res.cookie('jwt', token, { maxAge: maxAge * 1000, httpOnly: true });
            // Respond with a 200(success) status to be used by the fetch API
            res.status(200).json({ user: user._id });
        } else if (user.state === "admin") {
            // If it is an admin email, an admin cookie will be created
            const adtoken = createToken(user._id);
            const token = createAdminToken(user._id);
            res.cookie('jwt', adtoken, { httpOnly: true, maxAge: maxAge * 1000 });
            res.cookie('admin', token, { httpOnly: true, maxAge: maxAge * 1000 });
            res.status(200).json({ user: user._id });
        }
    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors })
    }
};

// Create a new user and add their details to a database
module.exports.signup_post = async (req, res) => {
    const { email, password, full_name } = req.body;

    try {
        const user = await User.create({ email, password, full_name });
        const token = createToken(user._id);
        // Create a cookie for the new user
        res.cookie('jwt', token, { maxAge: maxAge * 1000, httpOnly: true, admin: false });
        // Respond with a 200(success) status to be used by the fetch API
        res.status(200).json({ user: user._id });
    }
    catch (err) {
        const errors = handleErrors(err)
        res.status(400).json({ errors });
    }
};

// Render the contact template
module.exports.contact_get = (req, res) => {
    res.render('contact');
}

// Logout the user by getting rid of the cookies and redirecting them to the '/' route
module.exports.logout = (req, res) => {
    res.cookie('jwt', '', { httpOnly: true, maxAge: 1 });
    res.cookie('admin', '', { httpOnly: true, maxAge: 1 });
    res.cookie('item', '', { httpOnly: true, maxAge: 1 });
    res.redirect('/');
}
