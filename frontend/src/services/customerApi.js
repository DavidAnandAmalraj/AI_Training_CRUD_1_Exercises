/**
 * customerApi.js
 * Centralised API service for all customer CRUD operations.
 * All functions communicate with the backend REST API.
 */

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

/**
 * Helper: makes an HTTP request and parses the JSON response.
 * Throws an Error with the backend message if the status is not ok.
 */
async function request(path, options = {}) {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options
  });
  const data = await response.json();
  if (!response.ok) {
    const msg =
      data?.message ||
      (Array.isArray(data?.errors) ? data.errors.map((e) => e.msg).join(", ") : "Request failed");
    throw new Error(msg);
  }
  return data;
}

/** Fetch all customers */
export async function getAllCustomers() {
  const res = await request("/customers");
  return res.data;
}

/** Fetch a single customer by id */
export async function getCustomerById(id) {
  const res = await request(`/customers/${id}`);
  return res.data;
}

/** Create a new customer */
export async function createCustomer(customerData) {
  const res = await request("/customers", {
    method: "POST",
    body: JSON.stringify(customerData)
  });
  return res.data;
}

/** Update an existing customer */
export async function updateCustomer(id, customerData) {
  const res = await request(`/customers/${id}`, {
    method: "PUT",
    body: JSON.stringify(customerData)
  });
  return res.data;
}

/** Delete a customer */
export async function deleteCustomer(id) {
  await request(`/customers/${id}`, { method: "DELETE" });
}
