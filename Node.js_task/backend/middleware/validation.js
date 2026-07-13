const { body, validationResult } = require("express-validator");

exports.loginValidation = [
  body("email")
    .isString().withMessage("Email must be a string")
    .isEmail().withMessage("Invalid email format"),

  body("password")
    .isString().withMessage("Password must be a string"),
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