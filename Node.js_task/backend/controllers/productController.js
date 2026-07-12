const Product = require('../models/Product');
const generateProductPDF = require('../utils/pdfGenerator');

exports.addProduct = async (req, res) => {
  try {
    const { productName, productDescription } = req.body;

    const brands = JSON.parse(req.body.brands);

   brands.forEach((brand, index) => {
  if (req.files[index]) {
    brand.image = `/uploads/${req.files[index].filename}`;
  }
});

    const product = await Product.create({
      seller: req.user.id,
      productName,
      productDescription,
      brands,
    });

    res.status(201).json({
      success: true,
      data: product,
    });

  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

exports.getMyProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await Product.countDocuments({ seller: req.user.id });

    const products = await Product.find({ seller: req.user.id })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      page,
      pages: Math.ceil(total / limit),
      data: products,
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    if (product.seller.toString() !== req.user.id) { 
      return res.status(403).json({ message: 'Unauthorized to delete this product' }); 
    }

    await product.deleteOne();
    res.status(200).json({ success: true, message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message }); 
  }
};

exports.viewPDF = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    generateProductPDF(product, res);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

