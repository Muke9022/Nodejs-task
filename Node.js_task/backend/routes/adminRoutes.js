const express = require('express');
const router = express.Router();
const { adminLogin, createSeller, getSellers } = require('../controllers/adminController');
const { protect } = require('../middleware/auth'); 
const { authorize } = require('../middleware/role'); 

router.post('/login', adminLogin);

router.post('/create-seller', protect, authorize('admin'), createSeller);
router.get('/sellers', protect, authorize('admin'), getSellers);

module.exports = router;