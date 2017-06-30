const low = require('lowdb');

module.exports = (connectionString) => {
    const db = low(connectionString);
    db.defaults({ items: [], users: [] })
        .write();

    db._.mixin(require('lodash-id'));

    return Promise.resolve(db);
};
