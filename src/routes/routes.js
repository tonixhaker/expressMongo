import express from 'express'
let router = express.Router();

router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

router.get('/', function(req, res) {
    res.send('home page');
});

router.get('/about', function(req, res) {
    res.send('About us');
});


module.exports = router;