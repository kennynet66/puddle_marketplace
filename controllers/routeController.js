const mongoose = require('mongoose');
const User = require('../models/User');
const {SENDMAIL} = require('./mail');

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
