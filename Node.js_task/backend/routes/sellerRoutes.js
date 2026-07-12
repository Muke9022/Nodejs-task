const express = require('express');
const router = express.Router();
const { sellerLogin } = require('../controllers/sellerController');

router.post('/login', sellerLogin);

module.exports = router;