// Import required modules
const Item = require('../models/item');
const url = require('url');
const jwt = require('jsonwebtoken');

/*
* Creating a separate view route to render the view page is totally optional.
* I created it like that to prevent users from tampering with the item id
*/

const maxAge = 3 * 24 * 60 * 60
const createToken = (id) => {
    return jwt.sign({ id }, process.env.ITEMSECRET, {
        expiresIn: maxAge
    })
}

// Extract the item id from the request url using the url parser module
module.exports.item_get = async (req, res) => {
    let { query } = url.parse(req.url, true)

    try {
        // Find the item by id from the database
        const item = await Item.findById(query.id);

        if (item) {
            // If the item exists a cookie for the item will be made and user redirected to the view route
            const token = createToken(query.id);
            res.cookie('item', token, { httpOnly: true });
            res.redirect('/view')
        } else {
            // if the item does not exist the 404 error template will be rendered
            res.render('404');
        }
    } catch (err) {
        res.render('404');
    }
}
