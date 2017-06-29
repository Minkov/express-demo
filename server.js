/* globals __dirname */

const path = require('path');

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'pug');

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, done) => {
    req.user = {
        username: 'Gosho',
    };

    done();
});

app.use('/libs',
    express.static(
        path.join(__dirname, './node_modules'))
);

app.use('/static',
    express.static(
        path.join(__dirname, './static'))
);

app.get('/404', (req, res) => {
    return res.send('<h1>Error</h1>');
});

require('./routes/server.routes')(app);
require('./routes/api.routes').attach(app);

app.get('*', (req, res) => {
    res.redirect('/404');
});

app.listen(3001, () => console.log('Magic happens at :3001'));
