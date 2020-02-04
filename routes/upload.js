const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const isAllowedExtension = require('../utils/fileCommons');
const uploadJediImg = require('../utils/jediCommons');

//default conf
app.use( fileUpload({ useTempFiles: true }) );

app.put('/upload/:id', (req, res) => {

    let id = req.params.id;

    if(!req.files){
        return res.status(400).json({
            ok: false,
            err: 'No files selected to be uploaded'
        })
    }

    let sampleFile = req.files.data;

    if (!isAllowedExtension(sampleFile)){
        return res.status(500).json({
            ok: false,
            message: 'File with not allowed extension'
        })
    }

    fileUploadedName = `${id}.${sampleFile.name.split(".")[1]}`;

    sampleFile.mv(`uploads/jedi/${fileUploadedName}`, (err)=> {
        
        if (err){
            return res.status(500).json({
                ok: false,
                err
            })
        }

        uploadJediImg(fileUploadedName)
            .then(result => {

                res.json({
                    ok: true,
                    result
                })
                
            })
            .catch(err => {

                return res.status(500).json({
                    ok: false,
                    err
                })
            });
    })
}); 

module.exports = app;