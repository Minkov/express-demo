/* globals process */

const gulp = require('gulp');

const nodemon = require('gulp-nodemon');

// eslint-disable-next-line no-process-env
const port = process.env.PORT || 3001;

const app = require('./app');
let server = null;

gulp.task('server:start', () => {
    server = app.listen(port, () => console.log(`Magic happens at :${port}`));
});

gulp.task('server:restart', () => {
    const pr = Promise.resolve();
    if (server) {
        pr.then(() => server.close());
    }

    return pr.then(() => {
        server = app.listen(port, () =>
            console.log(`Magic happens at :${port}`));
    });
});

gulp.task('server:stop', () => {
    if (server) {
        server.close();
    }
});

gulp.task('dev', ['server:restart'], () => {
    return nodemon({
        ext: 'js',
        tasks: ['server:restart'],
        script: 'server.js',
    });
});
