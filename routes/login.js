const express = require('express');
const app = express();
//encrypt hash generator
const bcrypt = require('bcrypt');
const Jedi = require('../model/jedi');
const jwt = require('jsonwebtoken');



app.post('/login', (req, res) => {


    let body = req.body;

    Jedi.findOne({ email: body.email}, (err, jediDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if (!jediDB){
            return res.status(400).json({
                ok: false,
                message: `Login failed for User ${body.email} !`
            })
        }
       
        //generates hash and compares each other (do not send hashed password)
        if (!bcrypt.compareSync(body.password, jediDB.password)) {
            return res.status(400).json({
                ok: false,
                message: 'Wrong user credentials'
            })
        }

        //generates JWT
        let token = jwt.sign({
            jedi: jediDB
        }, process.env.TOKEN_SIGN, {expiresIn: process.env.TOKEN_EXPIRY});

        res.json({
            ok: true,
            message: `User ${body.email} logged in`,
            token
        })
    
    })

   
});



module.exports = app;