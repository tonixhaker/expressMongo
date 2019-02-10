const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        required: true
    },
    phoneNumber: String
});

module.exports = model('user', userSchema);