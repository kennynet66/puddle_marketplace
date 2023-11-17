const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');
const Item = require('../models/item');
const url = require('url')

const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: "", password: "" };

    if (err.message.includes('incorrect email')) {
        errors.email = "not admin email";
        return errors;
    }

    if (err.message.includes('Email does not exist')) {
        errors.password = "Not admin email";
        return errors;
    }

    if (err.message.includes('Email does not exist')) {
        errors.password = "Not admin email";
        return errors;
    }

    if (err.message.includes('incorrect password')) {
        errors.password = "Incorrect password";
        return errors;
    }

    if (err.message.includes('invalid password')) {
        errors.password = "Incorrect password";
        return errors;
    }

    if (err.message.includes('invalid password')) {
        errors.password = "Incorrect password";
        return errors;
    }

    if (err.code = 11000){
        errors.email = "Email exists";
        return errors;
    }

    if (err.message.includes('admin validation failed')){
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message
        });
    }
    if (err.message.includes('item validation failed')){
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message
        });
    }
    return errors;
}

//create an admin token
const maxAge = 3 * 24 * 60 * 60
const createToken = (id) => {
    return jwt.sign({ id }, process.env.ADMINSECRET, {
        expiresIn: maxAge
    })
}


module.exports.admin_get = (req,res) => {
    res.render('adminlogin');
}

module.exports.admin_post = async (req,res) => {
    const { email, password } = req.body

    try {
        const admin = await Admin.adminlogin(email, password)
        const token = createToken(admin._id);
        res.cookie('admin', token, { httpOnly: true, maxAge: maxAge * 1000});
        res.status(200).json({ admin: admin._id });
        console.log(admin);
    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
}

module.exports.create_post = async (req,res) => {
    const { full_name, email, password } = req.body;

    try {
        const admin = await Admin.create({ full_name, email, password })
        res.status(200).json({ admin })
    }
    catch (err) {
        const errors = handleErrors(err)
        res.status(400).json({ errors });
    }
}


module.exports.item_get = (req,res) => {
    res.render('newItem');
}

module.exports.item_post = async (req, res) => {
    let newItem = {
        item_name: req.body.item_name,
        price: req.body.price,
        description: req.body.description,
        category: req.body.category
    };

    if (req.file) {
        newItem.photo = req.file.path;
    }

    try {
        const item = await Item.create(newItem);
        res.status(200).json({ item });
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
};


module.exports.item_put = async (req,res) => {
    const { _id } = req.body

    try {
        const item = await Item.findByIdAndUpdate(_id, req.body);
        if (item) {
            console.log("i found the item");
            const updatedItem = await Item.findById(_id);
            console.log(updatedItem)
            console.log(updatedItem)
            res.status(200).json({ updatedItem });
        } else {
            console.log("I could not find the item");
            res.status(400).json({ message: "could not update"});
        }
    }
    catch(err){
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
}

module.exports.item_delete = async (req,res) => {
    const { _id } = req.body;

    try {
        const deletedItem = await Item.findByIdAndDelete(_id);

        if (!deletedItem) {
            return res.status(404).json({ message: "item could not be deleted "});
        }
        res.status(200).json({ deletedItem });
    }
    catch (err) {
        console.log(err);
    }
}

module.exports.item_gets = async (req, res) => {
    let { query } = url.parse(req.url,true)
    try {
        const item = await Item.findById(query.id);
        if (item) {
            res.render('edit');
        } else {
            res.render('404');
        }
    } catch (err) {
        res.render('404');
    }
}