const express = require('express');
const app = express();

app.use( require('./jedi'));
app.use( require('./login'));

module.exports = app;