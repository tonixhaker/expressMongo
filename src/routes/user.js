import express from 'express'
import {checkAuth} from "./middlewares";
let router = express.Router();
const userSchema = require('../models/user');


router.use('/user', [ checkAuth ]);

router.get('/user', function(req, res) {
    res.send('user');
});

router.get('/test', function (req,res) {
    var user = new userSchema({ email: 'qweeee@qwe.com' });
    res.send(user.save());
});


module.exports = router;