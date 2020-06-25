const express = require('express');
const router = express.Router();
const axios = require('axios'); // hier einbinden notwendig

router.get('/', getCount);

// Summe auslesen in globaler variable
let bytecount = 0;

function getCount(req, res) {
    // im request brauchen wir mom nix auswerten
    res.json({
        bytecount: bytecount
    });
}

// POST 'http://localhost:3000/bytecounter/update'
router.post('/update', updateCount);

function updateCount(req, res) { // muss etwas gegenliefer, weil endpunkt!
    const bytes = req.body.bytes;
    bytecount += bytes;
    res.json(true);
}


// laufendes Aktualisieren (Polling bei queue)

// function die ein einziges mal bei der queue abfragt
async function pollQueue() {
    // library oben einbinden
    const response = await axios.get('http://localhost:3000/queue/pop');
    if (response.status === 200) {  // doppelter vergleich in JS ist wirklich den Inhalt zu überprüfen, === überprüft zusätzlich den Datentyp
        const bytes = response.data.bytes;
        bytecount += bytes;
    }
}

function repeatForever() {
    pollQueue().then();
    setTimeout(repeatForever, 2000); // alle 2 sekunden wird gelesen
}

repeatForever();

module.exports = router;
