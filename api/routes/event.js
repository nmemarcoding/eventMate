const router = require("express").Router();
const auth = require("../middlewear/auth.js");
const Event = require("../models/event.js");
const Gest = require("../models/gest.js");


const accountSid = "AC87c0eb0aeb724d6694655e45d47cb6ef";
const authToken = "11ddd7772da834d8b9401ba12828ea55";
const client = require('twilio')(accountSid, authToken);
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'outlook',
    auth: {
        user: 'nmemarcoding@outlook.com',
        pass: 'Nima1377@'
    }
});
 const options = {
    from: 'nmemarcoding@outlook.com',
    to: 'nmemarcoding@gmail.com',
    subject: 'test',
    text: 'najoor san for second time'
};


// rout to get event data base on event id
router.get("/get/:id", async(req, res) => {
    try {
        const event = await Event.findById(req.params.id).populate("gestList");
        res.status(200).json(event);
    } catch (err) {
        res.status(500).json(err);
        console.log(err)
    }
});

// rout to find all event by host id and send it to front end by sort by date
router.get("/all", auth, async(req, res) => {
    try {
        const events = await Event.find({ host: req.userId }).sort({ date: 1 });
        res.status(200).json(events);
    } catch (err) {
        res.status(500).json(err);
        console.log(err)
    }
});


// rout to create new event with hostid : req.userId
router.post("/create", auth, async(req, res) => {
    const newEvent = new Event({
        host: req.userId,
        title: req.body.title,
        description: req.body.description,
        date: req.body.date,
        time: req.body.time,
        location: req.body.location,
        gestList:[],
        acceptedGestList:[],
    }); 
    try {
        const savedEvent = await newEvent.save();
        res.status(200).json(savedEvent);
    } catch (err) {
        res.status(500).json(err);
        console.log(err)
    }
});

// rout to find event by id and add gust to gest list by creat new gust and add id to gest list 
router.post("/addGest/:id",  async(req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        const newGest = new Gest({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,

        });
        const savedGest = await newGest.save();
        event.gestList.push(savedGest._id);
        const savedEvent = await event.save();
        
    // .create({
    //     body: `google.com/?eventid=${req.params.id}&guestid=${savedGest._id}`,
    //     from: '+18888391829',
    //     to: `${req.body.phone}`
    // })
    // .then(message => {
    //     console.log('Message sent: ', message.sid);
    // })
    // .catch(err => {
    //     console.log('Error sending message: ', err);
    // });
    transporter.sendMail(options, function(err, info) {
        if (err) {
            console.log(err);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
   
        res.status(200).json(savedEvent);
    } catch (err) {
        res.status(500).json(err);
        console.log(err)
    }
});

// rout to find event by id and add guest id to accepted gest list if guest id is in gest list and make sure cant add accepted guest again
router.post("/acceptGest/:eventId/:guestId",  async(req, res) => {
    try {
        const event = await Event.findById(req.params.eventId);
       

        if (event.gestList.includes(req.params.guestId) && !event.acceptedGestList.includes(req.params.guestId)) {
            event.acceptedGestList.push(req.params.guestId);
            const savedEvent = await event.save();
            res.status(200).json(savedEvent);
        } else {
            res.status(403).json("you cant add this guest");
        }
    } catch (err) {
        res.status(500).json(err);
        console.log(err)
    }
});

// rout to find event by id and delete guest id from accepted gest list 
router.delete("/deleteGest/:eventId/:guestId",  async(req, res) => {
    try {
        const event = await Event.findById(req.params.eventId);
        if (event.acceptedGestList.includes(req.params.guestId)) {
            event.acceptedGestList.pull(req.params.guestId);
            const savedEvent = await event.save();
            res.status(200).json(savedEvent);
        } else {
            res.status(403).json("you cant delete this guest");
        }

    } catch (err) {
        res.status(500).json(err);
        console.log(err)
    }
});












module.exports = router;