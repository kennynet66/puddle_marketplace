const User = require('../models/User');
const {sendMail} = require('./mail');
const paypal = require('paypal-rest-sdk');
const Cart = require('../models/cart');
const jwt = require('jsonwebtoken');

const maxAge = 3 * 24 * 60 * 60
// Create a json web token for user authentication
const createToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET, {
        expiresIn: maxAge
    });
}


module.exports.forgot_post = async (req, res) => {
    
    try {
        const { email } = req.body
        const options = {
            from: {
                name: "Kenedy Maina",
                address: process.env.USER
            },
            to: email,
            subject: "Forgot password", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>", // html body
        };
        // const user = await User.findOne({ email });
        
        // if (user) {
            sendMail(options, (info) => {
                console.log("Email sent successfully");
                console.log("MESSAGE ID: ", info.messageId);
            });
            // sendMail(transporter, mailOptions)
            res.status(200).json({success: "Success"});
    } catch (err) {
        res.status(400).json({err})
        console.log(err);
    }
}

module.exports.forgot = (req, res) => {
    res.render('forgot');
}
// Configure paypal
paypal.configure({
    mode:'sandbox',
    client_id: process.env.PAYPAL_ID,
    client_secret: process.env.PAYPAL_SECRET
})

module.exports.pay_post = (req,res) =>{
    const create_payment_json = {
        "intent" : "sale",
        "payer" : {
            "payment_method" : "paypal"
        },
        "redirect_urls" : {
            "return_url" : "http://localhost:4000/success",
            "cancel_url" : "http://localhost:4000/cancel"
        },
        "transactions" : [{
            "item_list": {
                "items": [
                    {
                        "name": "Item 1",
                        "sku": "12345",
                        "price": Cart.cartValue.toString(),
                        "currency": "USD",
                        "quantity": "1"
                    }
                ]
            },
            "amount": {
                "currency": "USD",
                "total": Cart.cartValue.toString()
            },
            "description": "This is a test transaction"
    }]
}

paypal.payment.create(create_payment_json, function(error, payment) {
    if (error) {
        throw error;
    } else {
        for (let i = 0; i < payment.links.length; i++) {
            if (payment.links[i].rel === 'approval_url') {
                res.redirect(payment.links[i].href);
            }
        }
    }
});

}

module.exports.cart_post = async (req, res) => {
    const { user, products, cartStatus, cartValue } = req.body;

    try {
        const cart = await Cart.create({ user, products, cartStatus, cartValue });
        const token = createToken(cart._id)
        res.cookie('jwt', token, { maxAge: maxAge * 1000, httpOnly: true });
        res.status(200).json(cart);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

    

    // try {
    //     const cart =await Cart.create({ user, products, cartValue, cartStatus });
    //     res.status(200).json(cart);
    // } catch (err) {
    //     console.error(err);
    //     res.status(500).json({ error: 'Internal Server Error' });
    // }
