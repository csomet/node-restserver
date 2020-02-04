const Jedi = require('../model/jedi');

const uploadJediImg = (file) => {

    return new Promise( (resolve, reject) => {

        let id = file.split('.')[0];

        Jedi.findById(id, (err, jediDB) => {
    
            if (err){
                reject(err);
            }
    
            if (!jediDB){
                reject(`Jedi not found in DB`);
            }
    
            jediDB.img = file;
    
            jediDB.save( (err, jediSaved) => {
                if (err){
                    reject(`There was a problem trying to update img`);
                }

                resolve(`Image saved for jedi ${jediSaved.name}`);
            })
        })

    });

   
}

module.exports = uploadJediImg;