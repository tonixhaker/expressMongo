import express from 'express'
import auth from '../auth';
import mongoose from 'mongoose';
import passport from 'passport';
import {getValidationError} from "../../utils/validation";
const Joi = require('joi');
const User = mongoose.model('User');
let router = express.Router();

//POST registration [email,password]
router.post('/register', auth.optional, (req, res) => {
    const schema = {
        email: Joi.string().email().required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        password: Joi.string().required()
    };
    const user = req.body;
    Joi.validate(user, schema).then().catch((error)=> {return res.json(getValidationError(error))});
    const finalUser = new User(user);
    finalUser.setPassword(user.password);
    return finalUser.save()
        .then(() => res.json({ user: finalUser.toAuthJSON() }));
});

//POST login [email,password]
router.post('/login', auth.optional, (req, res, next) => {
    const { body: { user } } = req;

    if(!user){
        return res.status(422).json({
            errors: {
                user: 'is required',
            },
        });
    }

    if(!user.email) {
        return res.status(422).json({
            errors: {
                email: 'is required',
            },
        });
    }

    if(!user.password) {
        return res.status(422).json({
            errors: {
                password: 'is required',
            },
        });
    }

    return passport.authenticate('local', { session: false }, (err, passportUser) => {
        if(err) {
            return next(err);
        }

        if(passportUser) {
            const user = passportUser;
            user.token = passportUser.generateJWT();

            return res.json({ user: user.toAuthJSON() });
        }

        return res.status(400).info;
    })(req, res, next);
});

module.exports = router;