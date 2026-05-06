/**
 * Customer Controller
 * Handles HTTP request/response logic for all customer endpoints.
 * Delegates business logic to customerService.
 */

const { validationResult } = require("express-validator");
const customerService = require("../services/customerService");

/**
 * GET /api/customers
 * Returns all customers.
 */
function getAllCustomers(req, res) {
  const customers = customerService.getAllCustomers();
  res.status(200).json({ success: true, data: customers, count: customers.length });
}

/**
 * GET /api/customers/:id
 * Returns a single customer by id.
 */
function getCustomerById(req, res) {
  const customer = customerService.getCustomerById(req.params.id);
  if (!customer) {
    return res.status(404).json({ success: false, message: "Customer not found" });
  }
  res.status(200).json({ success: true, data: customer });
}

/**
 * POST /api/customers
 * Creates a new customer.
 */
function createCustomer(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const customer = customerService.addCustomer(req.body);
  res.status(201).json({ success: true, data: customer });
}

/**
 * PUT /api/customers/:id
 * Updates an existing customer.
 */
function updateCustomer(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const customer = customerService.updateCustomer(req.params.id, req.body);
  if (!customer) {
    return res.status(404).json({ success: false, message: "Customer not found" });
  }
  res.status(200).json({ success: true, data: customer });
}

/**
 * DELETE /api/customers/:id
 * Deletes a customer by id.
 */
function deleteCustomer(req, res) {
  const deleted = customerService.deleteCustomer(req.params.id);
  if (!deleted) {
    return res.status(404).json({ success: false, message: "Customer not found" });
  }
  res.status(200).json({ success: true, message: "Customer deleted successfully" });
}

module.exports = {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer
};
