const router = require("express").Router();
const auths = require("../middlewear/auth.js");

const nodemailer = require('nodemailer');



// rout to sed email to guest
router.post("/sendemail", auths, async(req, res) => {
    const transporter = nodemailer.createTransport({
        service: 'outlook',
        auth: {
            user: 'nmemarcoding@outlook.com',
            pass: 'Nima1377@'
        }
    });
    const options = {
        from: 'nmemarcoding@outlook.com',
        to: req.body.email,
        subject: req.body.subject,
        text: req.body.text
    };
    transporter.sendMail(options, function(err, info){
        if (err) {
            console.log(err);
            res.status(500).json(err);
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).json(info);
        }
    });
   

});





module.exports = router;