const express = require('express');
const app = express();
const { tokenVerify, hasAdminRole } = require('../server/middleware/auth');
let Rank = require('../model/rank');


/**
 * Get all ranks
 */
app.get("/rank", (req, res)=> {

    Rank.find()
        .sort('name')
        .exec( (err, ranks) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err: err
                })
            }

            res.json({
                ok: true,
                ranks
            })

        })

});

/**
 * Get rank info
 */
app.get("/rank/:id", tokenVerify, (req, res)=> {

    let id = req.params.id;

    Rank.findById(id , (err, rankDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err: err
            })
        }

        if (!rankDB) {
            return res.status(400).json({
                ok: false,
                err: `Rank ${id} not found in database!`
            })
        }

        res.json({
            ok: true,
            rank: rankDB
        })
    })

});


/**
 * Save new rank
 */
app.post("/rank", [tokenVerify, hasAdminRole], (req, res)=> {
    
    let body = req.body;

    let rank = new Rank({
        name: body.name,
        council: body.council
    });

    rank.save( (err, rankDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err: err
            })
        }

        if (!rankDB) {
            return res.status(400).json({
                ok: false,
                err: err
            })
        }

        res.json({
            ok: true,
            rank: rankDB
        })

    });
});

/**
 * update rank
 */
app.post("/rank", [tokenVerify, hasAdminRole], (req, res)=> {
    
    let body = req.body;

    let rank = new Rank({
        name: body.name,
        council: body.council
    });

    rank.findById(id,  (err, rankDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err: err
            })
        }

        if (!rankDB) {
            return res.status(400).json({
                ok: false,
                err: err
            })
        }

        rankDB.name = body.name;
        rankDB.council = body.council;

        rankDB.save( (err, updatedRank) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err: err
                })
            }

            res.json({
                ok: true,
                rank: updatedRank
            })
        });

    });
});

module.exports = app;
