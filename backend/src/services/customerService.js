/**
 * Customer Service
 * Contains all business logic for customer CRUD operations.
 * Uses an in-memory array as the data store (mock data).
 */

const mockData = require("../data/mockData");
const { createCustomer } = require("../models/customer");

// In-memory data store – initialised from mock data
let customers = [...mockData];

/**
 * Returns a fresh copy of all customers.
 * @returns {Customer[]}
 */
function getAllCustomers() {
  return [...customers];
}

/**
 * Finds a single customer by id.
 * @param {string} id
 * @returns {Customer|null}
 */
function getCustomerById(id) {
  return customers.find((c) => c.id === id) || null;
}

/**
 * Creates a new customer and persists it to the in-memory store.
 * @param {Object} data - Validated customer payload
 * @returns {Customer} The newly created customer
 */
function addCustomer(data) {
  const customer = createCustomer(data);
  customers.push(customer);
  return customer;
}

/**
 * Updates an existing customer by id.
 * @param {string} id
 * @param {Object} data - Fields to update
 * @returns {Customer|null} The updated customer or null if not found
 */
function updateCustomer(id, data) {
  const index = customers.findIndex((c) => c.id === id);
  if (index === -1) return null;

  customers[index] = {
    ...customers[index],
    ...data,
    id: customers[index].id,          // id is immutable
    createdAt: customers[index].createdAt, // createdAt is immutable
    updatedAt: new Date().toISOString()
  };
  return customers[index];
}

/**
 * Deletes a customer by id.
 * @param {string} id
 * @returns {boolean} true if deleted, false if not found
 */
function deleteCustomer(id) {
  const index = customers.findIndex((c) => c.id === id);
  if (index === -1) return false;
  customers.splice(index, 1);
  return true;
}

/**
 * Resets the data store to the original mock data.
 * Useful for resetting state between unit tests.
 */
function resetStore() {
  customers = [...mockData];
}

module.exports = {
  getAllCustomers,
  getCustomerById,
  addCustomer,
  updateCustomer,
  deleteCustomer,
  resetStore
};
