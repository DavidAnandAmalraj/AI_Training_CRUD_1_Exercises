const { initialCustomers } = require("../data/customers.mock");

let customers = [...initialCustomers];

const clone = (data) => JSON.parse(JSON.stringify(data));

const validateCustomerPayload = (payload) => {
  const requiredFields = ["name", "email", "phone", "city"];
  const missingField = requiredFields.find(
    (field) => !payload[field] || String(payload[field]).trim() === ""
  );

  if (missingField) {
    return `Field '${missingField}' is required`;
  }

  return null;
};

const getAllCustomers = () => clone(customers);

const getCustomerById = (id) => customers.find((item) => item.id === id) || null;

const createCustomer = (payload) => {
  const validationError = validateCustomerPayload(payload);
  if (validationError) {
    return { error: validationError };
  }

  const nextId = customers.length ? Math.max(...customers.map((c) => c.id)) + 1 : 1;
  const newCustomer = {
    id: nextId,
    name: payload.name.trim(),
    email: payload.email.trim(),
    phone: payload.phone.trim(),
    city: payload.city.trim()
  };

  customers.push(newCustomer);
  return { data: clone(newCustomer) };
};

const updateCustomer = (id, payload) => {
  const validationError = validateCustomerPayload(payload);
  if (validationError) {
    return { error: validationError };
  }

  const index = customers.findIndex((item) => item.id === id);
  if (index === -1) {
    return { notFound: true };
  }

  customers[index] = {
    id,
    name: payload.name.trim(),
    email: payload.email.trim(),
    phone: payload.phone.trim(),
    city: payload.city.trim()
  };

  return { data: clone(customers[index]) };
};

const deleteCustomer = (id) => {
  const index = customers.findIndex((item) => item.id === id);
  if (index === -1) {
    return { notFound: true };
  }

  const [removed] = customers.splice(index, 1);
  return { data: clone(removed) };
};

const resetCustomers = () => {
  customers = [...initialCustomers];
};

module.exports = {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  resetCustomers
};
