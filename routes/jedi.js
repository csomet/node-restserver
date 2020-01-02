const express = require('express');
const app = express();
//encrypt hash generator
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Jedi = require('../model/jedi');
const { tokenVerify, hasAdminRole } = require('../server/middleware/auth');

/**
 * GET: All jedi in DB
 * if we specify second param in the app.get we are saying we wanna execute this param (function) as a middleware
 */
app.get('/jedi', tokenVerify, (req, res) => {

    let pageSince = Number(req.query.pageSince || 0)
    let limitPerPage = Number(req.query.limit || 5)

    Jedi.find({state: true}, 'name email role state img')
        .skip(pageSince)
        .limit(limitPerPage)
        .exec( (err, jedis) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err: err
                })
            }
            Jedi.countDocuments({state: true}, (err, count) => {
                res.json({
                    ok: true,
                    total: count,
                    jedis
                })
            });

            
        })
})

/**
 * POST: New Jedi
 */
app.post('/jedi', [tokenVerify, hasAdminRole], (req, res) => {

    let body = req.body;

    let jedi = new Jedi({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10), 
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
            message: `User ${userDB.name} with email ${userDB.email} is created!`
        })
    })
   
})

/**
 * PUT: update one jedi in db
 */
app.put('/jedi/:id', [tokenVerify, hasAdminRole], (req, res) => {

    let id = req.params.id;
    //filter and copy in a new object field selected
    let body =  _.pick(req.body, ['name', 'email', 'img', 'role', 'state']);

    Jedi.findByIdAndUpdate(id, body, 
        {new: true, runValidators: true, context: 'query'}, 
        (err, jediDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        if (!jediDB) {
            res.status(400).json({
                ok: false,
                message: 'User not found!'
            })
        }
        console.log(jediDB)
        res.json({
            ok:true,
            message: `User ${jediDB.name} is updated`
        })
    })

   
})

/**
 * DELETE: delete a jedi in db version delete
 */
/*app.delete('/jedi/:id', (req, res) => {
    
    let id = req.params.id;

    Jedi.findByIdAndRemove(id, (err, deletedJedi) => {
        
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        if (!deletedJedi) {
           return res.status(400).json({
               ok: false,
               message: 'Jedi not found'
           })
        }

        res.json({
            ok: true,
            message: `Jedi ${deletedJedi} deleted!`
        })
        
    })
})*/

/**
 * DELETE: delete a jedi in db version update status
 */
app.delete('/jedi/:id', [tokenVerify, hasAdminRole], (req, res) => {
    
    let id = req.params.id;

    Jedi.findByIdAndUpdate(id, 
        {state: false},
        {new: true, runValidators: true, context: 'query'},  
        (err, deactivatedJedi) => {
        
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        if (!deactivatedJedi) {
            return res.status(400).json({
                ok: false, 
                message: 'Jedi not found!'
            })
        }

        res.status(201).json({
            ok: true,
            message: `Jedi ${deactivatedJedi.name} is deactivated!`
        })
        
    })
})

module.exports = app;