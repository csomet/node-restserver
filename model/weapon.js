const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let weaponTypes = {
    values: ['lightsaber', 'blaster', 'double-lightsaber'],
    message: '{VALUE} is not a valid weapon type'
}

let Schema = mongoose.Schema;
let definedSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Weapon name is required'],
        unique: true
    },
    type: {
        type: String,
        required: true,
        enum: weaponTypes
    }

});

//Injects as plugin mongoose validations (path will be changed by the unique field in the error message)
definedSchema.plugin(uniqueValidator, {message: '{PATH} must be unique'});

module.exports = mongoose.model('Weapon', definedSchema);