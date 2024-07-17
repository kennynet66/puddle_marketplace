const NewsLetter = require("../models/newsletter");

module.exports.subscribe =  (async(req, res) => {
    try {
        const {email} = req.body;

        const letter = await NewsLetter.create({email});

        res.status(200).json({
            success: "Successfully subscribed to news letter"
        });


    } catch (error) {
        res.render('404');
    }
});