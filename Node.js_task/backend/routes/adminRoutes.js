const express = require('express');
const router = express.Router();

const { adminLogin, createSeller, getSellers } = require('../controllers/adminController');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/role');

const {
  adminLoginValidation,
  createSellerValidation,
  validate,
} = require("../middleware/validation");

router.post(
  "/login",
  adminLoginValidation,
  validate,
  adminLogin
);

router.post(
  "/create-seller",
  protect,
  authorize("admin"),
  createSellerValidation,
  validate,
  createSeller
);

router.get(
  "/sellers",
  protect,
  authorize("admin"),
  getSellers
);

module.exports = router;