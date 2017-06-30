const express = require('express');

const app = express();

const init = async () => {
    require('./config/app.config')(app);

    const data = await require('./data')();
    await require('./config/auth.config')(app, data);

    app.use((req, res, next) => {
        next();
    });

    app.get('/404', (req, res) => {
        return res.send('<h1>Error</h1>');
    });

    app.get('/', (req, res) => {
        return res.render('home');
    });

    require('./routes')(app, data);
};

init();

module.exports = app;
