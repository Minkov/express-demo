const express = require('express');

const app = express();

const data = require('./data');

const init = async() => {
    require('./config/app.config')(app);
    await require('./config/auth.config')(app, data);

    app.use((req, res, next) => {
        console.log(' --- Current user ---');
        console.log(req.user);
        next();
    });

    app.get('/404', (req, res) => {
        return res.send('<h1>Error</h1>');
    });

    app.get('/', (req, res) => {
        return res.render('home');
    });

    require('./routes')(app);
};

init();

module.exports = app;
