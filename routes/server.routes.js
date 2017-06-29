const { Router } = require('express');

const attach = (app) => {
    const router = new Router();

    router
        .get('/', (req, res) => {
            res
                .status(404)
                .send('<h1>Home</h1>');
        }).get('/json', (req, res) => {
            res.send({
                id: 1,
                name: 'Gosho',
                interests: ['Math', 'JS'],
            });
        }).get('/all', (req, res) => {
            res.send(`<h1>All</h1>
    <ul>
        <li><a href="#item-1">Go to Item 1</a></li>
        <li><a href="#item-2">Go to Item 2</a></li>
        <li><a href="#item-3">Go to Item 3</a></li>
    </ul>
        `);
        });

    app.use('/', router);
};

module.exports = attach;
