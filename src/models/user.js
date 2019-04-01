const { Schema, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const findOrCreate = require('mongoose-findorcreate');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const UserSchema = new Schema({
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
    phoneNumber: String,
    picture: String,
    hash:String,
    salt:String
});

UserSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UserSchema.methods.validatePassword = function(password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
};

UserSchema.methods.generateJWT = function() {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);

    return jwt.sign({
        email: this.email,
        id: this._id,
        exp: parseInt(expirationDate.getTime() / 1000, 10),
    }, 'secret');
};

UserSchema.methods.toAuthJSON = function() {
    return {
        _id: this._id,
        email: this.email,
        token: this.generateJWT(),
    };
};

UserSchema.plugin(uniqueValidator);
UserSchema.plugin(findOrCreate);

module.exports = model('User', UserSchema);