const express = require('express');
const router = express.Router();

router.use('/api', require('./api'));
router.use('*', (req, res) => {
    res.setHeader('Content-Type','application/json');
    res.status(404).send(JSON.stringify({"error":"Not Found"}));
});

module.exports = router;