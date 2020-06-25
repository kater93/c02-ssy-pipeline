const express = require('express');
const logger = require('morgan');

// Generic application setup
const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Load routes into variables
const index = require('./routes/index');
const queue = require('./routes/queue'); // hier einbinden
const bytecounter = require('./routes/bytecounter');
const pubsub = require('./routes/pubsub');

// Routes
app.use('/', index);
app.use('/queue', queue); // und hier verbinden
app.use('/bytecounter', bytecounter);
app.use('/pubsub', pubsub);

module.exports = app;
