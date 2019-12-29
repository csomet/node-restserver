const express = require('express');
const app = express();
const Jedi = require('../model/jedi');

/**
 * GET: All jedi in DB
 */
app.get('/jedi', (req, res) => {
    
})

/**
 * POST: New Jedi
 */
app.post('/jedi', (req, res) => {

    let body = req.body;

    let jedi = new Jedi({
        name: body.name,
        email: body.email,
        password: body.password,
        role: body.role
    });

    jedi.save( (err, userDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err: err
            })
        }

        res.json({
            ok: true,
            jedi: userDB
        })
    })
   
})

/**
 * PUT: update one jedi in db
 */
app.put('/jedi/:id', (req, res) => {

    let id = req.params.id;

    res.json({
      id  
    })
})

/**
 * DELETE: delete a jedi in db
 */
app.delete('/jedi', (req, res) => {
    res.json('delete user');
})

module.exports = app;