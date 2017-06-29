const express = require('express');

const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('./routes/server.routes')(app);
require('./routes/api.routes').attach(app);

app.listen(3001, () => console.log('Magic happens at :3001'));
