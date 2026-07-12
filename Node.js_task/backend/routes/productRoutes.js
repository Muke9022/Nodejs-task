const express = require('express');
const router = express.Router();
const { addProduct, getMyProducts, deleteProduct, viewPDF } = require('../controllers/productController');
const { protect } = require('../middleware/auth'); 
const { authorize } = require('../middleware/role'); 
const upload = require("../middleware/upload");

router.post(
  "/",
  protect,
  authorize("seller"),
  upload.array("brandImages"),
  addProduct
);
router.get('/', protect, authorize('seller'), getMyProducts);
router.delete('/:id', protect, authorize('seller'), deleteProduct);
router.get('/:id/pdf', protect, viewPDF); 


module.exports = router;