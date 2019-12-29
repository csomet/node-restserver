require('../config/config');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.use( require('../routes/jedi'));

//Database mongodb connection
mongoose.connect('mongodb://localhost:27017/jedi', {useNewUrlParser: true, useUnifiedTopology: true}, 
(err, response) => {
    if (err) throw err;

    console.log('Connected to database');

});

app.listen(process.env.PORT, () => { 
    console.log('Listening on port 3000');
}); 

