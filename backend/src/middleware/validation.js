/**
 * Validation middleware for customer routes.
 * Uses express-validator to validate and sanitise request payloads.
 */

const { body } = require("express-validator");

/** Rules shared by both create and update */
const customerBaseRules = [
  body("firstName")
    .trim()
    .notEmpty()
    .withMessage("First name is required")
    .isLength({ max: 50 })
    .withMessage("First name must be at most 50 characters"),

  body("lastName")
    .trim()
    .notEmpty()
    .withMessage("Last name is required")
    .isLength({ max: 50 })
    .withMessage("Last name must be at most 50 characters"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Must be a valid email address")
    .normalizeEmail(),

  body("phone")
    .optional()
    .trim()
    .matches(/^\+?[\d\s\-().]{7,20}$/)
    .withMessage("Must be a valid phone number"),

  body("address").optional().trim().isLength({ max: 200 }),
  body("city").optional().trim().isLength({ max: 100 }),
  body("state").optional().trim().isLength({ max: 100 }),
  body("zipCode").optional().trim().isLength({ max: 20 }),
  body("country").optional().trim().isLength({ max: 100 })
];

/** Validation rules for creating a customer (POST) */
const createCustomerValidation = [...customerBaseRules];

/** Validation rules for updating a customer (PUT) */
const updateCustomerValidation = [
  body("firstName")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("First name cannot be empty")
    .isLength({ max: 50 }),

  body("lastName")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Last name cannot be empty")
    .isLength({ max: 50 }),

  body("email")
    .optional()
    .trim()
    .isEmail()
    .withMessage("Must be a valid email address")
    .normalizeEmail(),

  body("phone")
    .optional()
    .trim()
    .matches(/^\+?[\d\s\-().]{7,20}$/)
    .withMessage("Must be a valid phone number"),

  body("address").optional().trim().isLength({ max: 200 }),
  body("city").optional().trim().isLength({ max: 100 }),
  body("state").optional().trim().isLength({ max: 100 }),
  body("zipCode").optional().trim().isLength({ max: 20 }),
  body("country").optional().trim().isLength({ max: 100 })
];

module.exports = { createCustomerValidation, updateCustomerValidation };
