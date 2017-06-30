const { Router } = require('express');

const attach = (app, { items }) => {
    const router = new Router();

    router
        .get('/', (req, res) => {
            return items.getAll()
                .then((itemsList) => {
                    res.render('items/all', {
                        model: itemsList,
                    });
                });
        })
        .get('/form', (req, res) => {
            return res.render('items/form');
        })
        .get('/:id', (req, res) => {
            return items.getById(req.params.id)
                .then((item) => {
                    return res.render('items/details', {
                        model: item,
                    });
                });
        })
        .post('/', (req, res) => {
            return items.create(req.body.name)
                .then((item) => {
                    return res.redirect('/items');
                });
        });

    app.use('/items', router);
};

module.exports = attach;
