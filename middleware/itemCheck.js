const jwt = require('jsonwebtoken');
const Item = require('../models/item');


const checkItem = async (req,res, next) => {
    const token = req.cookies.item;
    if (token) {
        jwt.verify(token, process.env.ITEMSECRET, async (err, decodedToken) => {
            if (err) {
                res.locals.item = null;
                next();
            } else {
                let item = await Item.findById(decodedToken.id);
                res.locals.item = item;
                next();
            }
        });
    } else {
        res.redirect('/dashboard')
        next();
}
}

module.exports = { checkItem };