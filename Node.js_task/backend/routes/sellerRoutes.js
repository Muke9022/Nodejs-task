const express = require('express');
const router = express.Router();

const { sellerLogin } = require('../controllers/sellerController');

const {
  sellerLoginValidation,
  validate,
} = require("../middleware/validation");

router.post(
  "/login",
  sellerLoginValidation,
  validate,
  sellerLogin
);

module.exports = router;