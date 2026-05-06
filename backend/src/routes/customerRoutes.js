/**
 * Customer Routes
 * Defines all routes for the /api/customers resource.
 */

const express = require("express");
const router = express.Router();

const customerController = require("../controllers/customerController");
const { createCustomerValidation, updateCustomerValidation } = require("../middleware/validation");

/**
 * @route   GET /api/customers
 * @desc    Get all customers
 * @access  Public
 */
router.get("/", customerController.getAllCustomers);

/**
 * @route   GET /api/customers/:id
 * @desc    Get a single customer by id
 * @access  Public
 */
router.get("/:id", customerController.getCustomerById);

/**
 * @route   POST /api/customers
 * @desc    Create a new customer
 * @access  Public
 */
router.post("/", createCustomerValidation, customerController.createCustomer);

/**
 * @route   PUT /api/customers/:id
 * @desc    Update an existing customer
 * @access  Public
 */
router.put("/:id", updateCustomerValidation, customerController.updateCustomer);

/**
 * @route   DELETE /api/customers/:id
 * @desc    Delete a customer
 * @access  Public
 */
router.delete("/:id", customerController.deleteCustomer);

module.exports = router;
