const customerService = require("../services/customer.service");

const parseId = (idParam) => Number(idParam);

const getAllCustomers = (req, res) => {
  const customers = customerService.getAllCustomers();
  return res.status(200).json(customers);
};

const getCustomerById = (req, res) => {
  const id = parseId(req.params.id);
  const customer = customerService.getCustomerById(id);

  if (!customer) {
    return res.status(404).json({ message: "Customer not found" });
  }

  return res.status(200).json(customer);
};

const createCustomer = (req, res) => {
  const result = customerService.createCustomer(req.body || {});

  if (result.error) {
    return res.status(400).json({ message: result.error });
  }

  return res.status(201).json(result.data);
};

const updateCustomer = (req, res) => {
  const id = parseId(req.params.id);
  const result = customerService.updateCustomer(id, req.body || {});

  if (result.notFound) {
    return res.status(404).json({ message: "Customer not found" });
  }

  if (result.error) {
    return res.status(400).json({ message: result.error });
  }

  return res.status(200).json(result.data);
};

const deleteCustomer = (req, res) => {
  const id = parseId(req.params.id);
  const result = customerService.deleteCustomer(id);

  if (result.notFound) {
    return res.status(404).json({ message: "Customer not found" });
  }

  return res.status(200).json({ message: "Customer deleted", customer: result.data });
};

module.exports = {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer
};
