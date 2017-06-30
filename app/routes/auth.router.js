const { Router } = require('express');
const passport = require('passport');

const attach = (app, { users }) => {
    const router = new Router();

    router
        .get('/sign-up', (req, res) => {
            return res.render('auth/sign-up');
        })
        .post('/sign-up', (req, res) => {
            const user = req.body;
            if (!user) {
                return res.send(400)
                    .redirect('/auth/sign-up?err=invalid-user');
            }

            return users.signUp(user.username, user.password)
                .then(() => {
                    return res.redirect('/auth/sign-in');
                })
                .catch((err) => {
                    console.log(err);
                    return res.redirect('/auth/sign-up?err=' + err.message);
                });
        })
        .get('/sign-in', (req, res) => {
            return res.render('auth/sign-in');
        })
        .post('/sign-in', passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/auth/sign-in',
            failureFlash: true,
        }))
        .get('/sign-out', (req, res) => {
            req.logout();
            res.redirect('/');
        });

    app.use('/auth', router);
};

module.exports = attach;
