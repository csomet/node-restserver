const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;
let definedSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Rank name is required'],
        unique: true
    },
    council: {
        type: Boolean,
        required: false,
        default: false
    }

});

//Injects as plugin mongoose validations (path will be changed by the unique field in the error message)
definedSchema.plugin(uniqueValidator, {message: '{PATH} must be unique'});

module.exports = mongoose.model('Rank', definedSchema);