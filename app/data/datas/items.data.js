const init = (db) => {
    const items = {
        getAll() {
            const itemsList = db.get('items')
                .value();
            return Promise.resolve(itemsList);
        },
        getById(id) {
            const item = db.get('items')
                .getById(id)
                .value();
            return Promise.resolve(item || null);
        },
        create(name) {
            let item = { name };

            item = db.get('items')
                .insert(item).write();

            return Promise.resolve(item);
        },
    };
    return items;
};

module.exports = init;
