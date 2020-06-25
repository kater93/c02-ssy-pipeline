const express = require('express');
const router = express.Router();
const axios = require('axios');

// neue Nachricht - Endpunkt - die pubsub erhält und leitet diese weiter an alle Subscriber
router.post('/publish', newMessage);


// array, in dem subsrciber stehen
const subscribers = [
    'http://localhost:3000/bytecounter/update' // von der idee her: array von urls (subscribers)
];


async function newMessage(req, res) {
    const message = req.body.msg;

    for (let subscriber of subscribers) {
        await axios.post(subscriber, message);
    }

    res.json(true)
}




module.exports = router;


// queue funktioniert nur für 1 service,
// pub (publish) sub (subscribe) - geht für mehrere, automatisch
// pub sagt: wenn du mir was sendest, dann leite ich es weiter
// im bytecounter update implementieren