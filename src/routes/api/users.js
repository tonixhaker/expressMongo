import auth from '../auth';
import express from "express";
import mongoose from "mongoose";
let router = express.Router();
const User = mongoose.model('User');

//GET return current user info
router.get('/current', auth.required, (req, res, next) => {
    const { payload: { id } } = req;
    console.log(id);
    return User.findById(id)
        .then((user) => {
            if(!user) {
                return res.sendStatus(400);
            }

            return res.json({ user: user.toAuthJSON() });
        })
        .catch(e=>console.log(e));
});

module.exports = router;