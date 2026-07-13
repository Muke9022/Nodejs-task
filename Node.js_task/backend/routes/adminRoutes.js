const express = require('express');
const router = express.Router();
const { adminLogin, createSeller, getSellers } = require('../controllers/adminController');
const { protect } = require('../middleware/auth'); 
const { authorize } = require('../middleware/role'); 

const { loginValidation, validate } = require("../middleware/validation");

router.post(
  "/login",
  loginValidation,
  validate,
  adminLogin
);

router.post('/create-seller', protect, authorize('admin'), createSeller);
router.get('/sellers', protect, authorize('admin'), getSellers);

module.exports = router;