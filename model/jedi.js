const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let roles = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} is not valid role'
}

let Schema = mongoose.Schema;
let definedSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    email: {
        type: String, 
        required: [true, 'email is needed'],
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: false,
        default: ''
    },
    google: {
        type: Boolean,
        required: false
    },
    state: {
        type: Boolean,
        default: true,
        require: true
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: roles
    }
});

//Injects as plugin mongoose validations (path will be changed by the unique field in the error message)
definedSchema.plugin(uniqueValidator, {message: '{PATH} must be unique'})

module.exports = mongoose.model('Jedi', definedSchema);