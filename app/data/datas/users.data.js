const hash = (str) => {
    // pretty simple hash, only for demo
    return `!${str}*`;
};

const init = (db) => {
    const users = {
        findById(id) {
            const user = db.get('users')
                .find({ id })
                .value();
            return Promise.resolve(user);
        },
        findByUsername(username) {
            const user = db.get('users')
                .find({ username })
                .value();
            return Promise.resolve(user);
        },
        signUp(username, password) {
            return this.findByUsername(username)
                .then((user) => {
                    if (user) {
                        throw new Error('Duplicated user');
                    }
                    const passhash = hash(password);
                    user = { username, passhash };
                    user = db.get('users')
                        .insert(user).write();
                    return user;
                });
        },
        signIn(username, password) {
            const passhash = hash(password);
            return this.findByUsername(username)
                .then((user) => {
                    if (!user || user.passhash !== passhash) {
                        throw new Error('Invalid user or password');
                    }
                    return user;
                });
        },
    };
    return users;
};

module.exports = init;
