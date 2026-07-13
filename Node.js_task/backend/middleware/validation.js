const { body, param, validationResult } = require("express-validator");

exports.adminLoginValidation = [
  body("email")
    .exists().withMessage("Email is required")
    .bail()
    .isString().withMessage("Email must be a string")
    .bail()
    .isEmail().withMessage("Invalid email format"),

  body("password")
    .exists().withMessage("Password is required")
    .bail()
    .isString().withMessage("Password must be a string")
    .bail()
    .notEmpty().withMessage("Password cannot be empty")
];

exports.createSellerValidation = [
  body("name")
    .exists().notEmpty().withMessage("Name is required")
    .isString().withMessage("Name must be a string"),

  body("email")
    .exists().notEmpty().withMessage("Email is required")
    .isString().withMessage("Email must be a string")
    .isEmail().withMessage("Invalid email format"),

  body("mobileNo")
    .exists().notEmpty().withMessage("Mobile number is required")
    .isString().withMessage("Mobile number must be a string")
    .matches(/^[0-9]{10}$/).withMessage("Mobile number must be 10 digits"),

  body("country")
    .exists().notEmpty().withMessage("Country is required")
    .isString().withMessage("Country must be a string"),

  body("state")
    .exists().notEmpty().withMessage("State is required")
    .isString().withMessage("State must be a string"),

 body("skills")
  .exists().withMessage("Skills are required")
  .bail()
  .isArray({ min: 1 }).withMessage("Skills must be a non-empty array"),

  body("password")
    .exists().notEmpty().withMessage("Password is required")
    .isString().withMessage("Password must be a string")
    .isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
];
exports.sellerLoginValidation = [
  body("email")
    .exists().withMessage("Email is required")
    .bail()
    .notEmpty().withMessage("Email cannot be empty")
    .bail()
    .isString().withMessage("Email must be a string")
    .bail()
    .isEmail().withMessage("Invalid email format"),

  body("password")
    .exists().withMessage("Password is required")
    .bail()
    .notEmpty().withMessage("Password cannot be empty")
    .bail()
    .isString().withMessage("Password must be a string"),
];
exports.addProductValidation = [
  body("productName")
    .exists().withMessage("Product name is required")
    .bail()
    .notEmpty().withMessage("Product name cannot be empty")
    .bail()
    .isString().withMessage("Product name must be a string"),

  body("productDescription")
    .exists().withMessage("Product description is required")
    .bail()
    .notEmpty().withMessage("Product description cannot be empty")
    .bail()
    .isString().withMessage("Product description must be a string"),

  body("brands")
    .exists().withMessage("Brands are required")
    .bail()
    .isArray({ min: 1 }).withMessage("Brands must be a non-empty array"),

  body("brands.*.brandName")
    .exists().withMessage("Brand name is required")
    .bail()
    .isString().withMessage("Brand name must be a string"),

  body("brands.*.detail")
    .exists().withMessage("Brand detail is required")
    .bail()
    .isString().withMessage("Brand detail must be a string"),

  body("brands.*.price")
    .exists().withMessage("Price is required")
    .bail()
    .isNumeric().withMessage("Price must be a number"),
];
exports.deleteProductValidation = [
  param("id")
    .isMongoId()
    .withMessage("Invalid product id"),
];
exports.validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  next();
};