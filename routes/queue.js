const express = require('express');
const router = express.Router();

// neue Nachricht - Endpunkt
router.post('/push', newMessage);

// auslesen einer Nachricht
router.get('/pop', readMessage);

// Anzahl der Nachrichten in der Queue
router.get('/count', messageCount);

// queue ist anfangs ein leeres array - hier kommen die nachrichten hinein, die wir uns holen
const queue = []

// Metadaten sollen ausgetauscht werden (zB Zeit..)
/*
// hier ist Platz für Metadaten, die uns momentan nicht interessieren
    {
        msg: "....", // wie nachricht ausschaut ist egal
    }
 */

function newMessage(req, res) { // in der queue ablegen
    const message = req.body.msg;
    queue.push(message); // fügt Nachricht am ende des arrays hinzu
    res.json(true) // als ok - hat funktioniert = Message akzeptiert/gespeichert
}

function readMessage(req, res) {
    const message = queue.shift() // shift funktion = immer das 1. aus dem array holen, bewegt array um 1 nach links
    // message liefert nachricht oder ist undefined
    if (typeof message === "undefined") {
        res.status(204); // 204 steht für no content
        res.end(); // damit klar ist, dass nach dem status nix mehr passiert
    } else { // nachricht vorhanden
        res.json(message);
    }
}

function messageCount(req, res) {
    res.json({
        count: queue.length // wir liefern ein ganzes Objekt zurück
    });
}


module.exports = router;
