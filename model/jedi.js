const mongoose = require('mongoose');

let Schema = mongoose.Schema;
let definedSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    email: {
        type: String, 
        required: [true, 'email is needed']
    },
    password: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: false
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
        default: 'USER_ROLE'
    }
});

module.exports = mongoose.model('Jedi', definedSchema);