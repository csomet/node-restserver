const express = require('express');
const app = express();

app.use( require('./rank'));
app.use( require('./jedi'));
app.use( require('./login'));
app.use( require('../routes/upload'));


module.exports = app;