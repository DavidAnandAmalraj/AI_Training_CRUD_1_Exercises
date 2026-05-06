/**
 * Customer model definition.
 * Describes the shape of a customer object and provides a factory method.
 */

const { v4: uuidv4 } = require("uuid");

/**
 * Customer fields:
 * @typedef {Object} Customer
 * @property {string} id           - Unique identifier (UUID)
 * @property {string} firstName    - First name
 * @property {string} lastName     - Last name
 * @property {string} email        - Email address (unique)
 * @property {string} phone        - Phone number
 * @property {string} address      - Street address
 * @property {string} city         - City
 * @property {string} state        - State / Province
 * @property {string} zipCode      - ZIP / Postal code
 * @property {string} country      - Country
 * @property {string} createdAt    - ISO timestamp of creation
 * @property {string} updatedAt    - ISO timestamp of last update
 */

/**
 * Creates a new customer object with generated id and timestamps.
 * @param {Object} data - Customer data (without id/timestamps)
 * @returns {Customer}
 */
function createCustomer(data) {
  const now = new Date().toISOString();
  return {
    id: uuidv4(),
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    phone: data.phone || "",
    address: data.address || "",
    city: data.city || "",
    state: data.state || "",
    zipCode: data.zipCode || "",
    country: data.country || "",
    createdAt: now,
    updatedAt: now
  };
}

module.exports = { createCustomer };
