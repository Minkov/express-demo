/* globals __dirname */

const express = require('express');

const app = express();

require('./config/app.config')(app);

app.get('/404', (req, res) => {
    return res.send('<h1>Error</h1>');
});

app.get('/', (req, res) => {
    return res.render('home');
});

require('./routes')(app);


module.exports = app;
