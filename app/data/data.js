/* globals __dirname */

const path = require('path');

module.exports = () => {
    const connectionString = path.join(__dirname, '../db/db.json');
    return require('../db')(connectionString)
        .then((db) => {
            return {
                users: require('./datas/users.data')(db),
                items: require('./datas/items.data')(db),
            };
        });
};
