import express from 'express'
let router = express.Router();

router.get('/', function(req, res) {
    res.send('home page');
});

router.get('/about', function(req, res) {
    res.send('About us');
});


module.exports = router;