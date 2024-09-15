const express = require('express');
const router = express.Router();

router.post('/register', (req, res) => {
    res.json({messgae: 'Register the user'});
});

router.post('/login', (req, res) => {
    res.json({messgae: 'login the user'});
});

router.post('/current', (req, res) => {
    res.json({messgae: 'Current user information'});
});

module.exports = router;