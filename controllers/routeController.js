const mongoose = require('mongoose');
const User = require('../models/User');
const {SENDMAIL} = require('./mail');
const { payment } = require('paypal-rest-sdk');
const paypal = require('paypal-rest-sdk');

const options = {
    from: {
        name: "Kenedy Maina",
        address: process.env.USER
    },
    to: "kenedymaina634@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
};

/* const mailOptions = {
    from: {
        name: "Kenedy Maina",
        address: process.env.USER
    },
    to: "kenedymaina634@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
};

const sendMail = async(transporter, mailOptions) => {
    try {
        await transporter.sendMail(mailOptions);
        console.log("Email has been sent successfully");
    } catch (err) {
        if (err.code === 'EAUTH') {
            console.log('Authentication failed. Check your Gmail credentials.');
        } else {
            console.log('Error sending email:', err);
        }
    }
} */


module.exports.forgot_post = async (req, res) => {
    const { email } = req.body

    try {
        const user = await User.findOne({ email });
        
        if (user) {
            SENDMAIL(options, (info) => {
                console.log("Email sent successfully");
                console.log("MESSAGE ID: ", info.messageId);
            });
            // sendMail(transporter, mailOptions)
            res.status(200).json(user);
        } else {
            res.redirect('/signup');
        }
    } catch (err) {
        res.status(400).json(err)
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
                        "price": "100.00",
                        "currency": "USD",
                        "quantity": "1"
                    }
                ]
            },
            "amount": {
                "currency": "USD",
                "total": "100.00"
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