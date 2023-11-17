const Item = require('../models/item');
const url = require('url');
const jwt = require('jsonwebtoken');

const maxAge = 3 * 24 * 60 * 60
const createToken = (id) => {
    return jwt.sign({ id }, 'ITEMSECRET', {
        expiresIn: maxAge
    })
}

module.exports.item_get = async (req,res) => {
    let { query } = url.parse(req.url,true)

    try {
        const item = await Item.findById(query.id);
        
        if (item) {
            const token = createToken(query.id);
            res.cookie('item', token, {httpOnly: true });
            res.redirect('/view')
        } else {
            res.render('404');
        }
    } catch (err) {
        res.render('404');
    }
}

module.exports.get_view = (req,res) => {
    res.render('item');
}