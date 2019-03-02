const { Schema, model } = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');


const userSchema = new Schema({
    firstName: {
        type:String,
        required: true,
    },
    lastName: {
        type:String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: String
});

userSchema.plugin(uniqueValidator);
module.exports = model('user', userSchema);