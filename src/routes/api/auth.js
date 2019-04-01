import express from 'express'
import mongoose from 'mongoose';
import passport from 'passport';



const User = mongoose.model('User');
let router = express.Router();

//POST registration [email,password]
router.post('/register',  (req, res, next) => {
    const { body: { user } } = req;

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

    const finalUser = new User(user);

    finalUser.setPassword(user.password);

    return finalUser.save()
        .then(() => res.json({ user: finalUser.toAuthJSON() }));
});

//POST login [email,password]
router.post('/login', (req, res, next) => {
    console.log(req.body);
    const { body: { user } } = req;

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

//GET return current user info
router.get('/current', (req, res, next) => {
    const { payload: { id } } = req;

    return User.findById(id)
        .then((user) => {
            if(!user) {
                return res.sendStatus(400);
            }

            return res.json({ user: user.toAuthJSON() });
        });
});


router.get('/google',
    passport.authenticate('google', { scope: ['email','profile','https://www.googleapis.com/auth/plus.login'] }));

router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
    return res.json({qwe:"eqeweqweqwe"})
        //res.redirect('/');
    });

module.exports = router;