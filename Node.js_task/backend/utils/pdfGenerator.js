const PDFDocument = require('pdfkit');

const generateProductPDF = (product, res) => {
  const doc = new PDFDocument({ margin: 50 });

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `inline; filename=${product.productName}.pdf`);

  doc.pipe(res);

  
  doc.fontSize(24).fillColor('#1a365d').text('Product Specification Report', { align: 'center' }).moveDown();
  doc.moveTo(50, 90).lineTo(550, 90).strokeColor('#cbd5e1').stroke();
  doc.moveDown(2);

  doc.fontSize(16).fillColor('#2d3748').text(`Product Name: ${product.productName}`, { bold: true });
  doc.fontSize(12).fillColor('#4a5568').text(`Description: ${product.productDescription}`).moveDown(2);

  doc.fontSize(14).fillColor('#1a365d').text('Associated Brands:', { underline: true }).moveDown(); 

  let totalPrice = 0;

  
  product.brands.forEach((brand, index) => {
    doc.fontSize(12).fillColor('#2d3748').text(`${index + 1}. ${brand.brandName}`, { bold: true }); 
    doc.fontSize(11).fillColor('#718096').text(`   Details: ${brand.detail}`);
      doc.fontSize(11).fillColor('#2f855a').text(`   Price: ₹${brand.price}`); 
    doc.moveDown(0.5);
    totalPrice += brand.price; 
  });

  doc.moveTo(50, doc.y).lineTo(550, doc.y).strokeColor('#cbd5e1').stroke();
  doc.moveDown();

  
  doc.fontSize(16).fillColor('#e53e3e').text(`Total Price (All Brands): ₹${totalPrice}`, { align: 'right', bold: true }); 

  doc.end();
};

module.exports = generateProductPDF;