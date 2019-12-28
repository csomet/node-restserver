require('../config/config');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())



app.get('/', (req, res) => {
    res.json('Hello!')
})

app.get('/users', (req, res) => {
    res.json({
        name: "Carlos"
    })
})

app.post('/users', (req, res) => {

    let body = req.body;

    if (body.name === undefined){
        res.status(400).json({
            ok: false,
            message: 'name needed'
        });
    } else {
        res.json(body);
    }

   
})

app.put('/users/:id', (req, res) => {

    let id = req.params.id;

    res.json({
      id  
    })
})

app.delete('/users', (req, res) => {
    res.json('delete user');
})

app.listen(process.env.PORT, () => { 
    console.log('Listening on port 3000');
}); 