const BASE_URL = "http://localhost:5000/api/customers";

const parseResponse = async (response) => {
  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.message || "Request failed");
  }
  return body;
};

export const fetchCustomers = async () => {
  const response = await fetch(BASE_URL);
  return parseResponse(response);
};

export const addCustomer = async (payload) => {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  return parseResponse(response);
};

export const editCustomer = async (id, payload) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  return parseResponse(response);
};

export const removeCustomer = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  return parseResponse(response);
};
