const service = require("../../src/services/customer.service");

describe("customer service", () => {
  beforeEach(() => {
    service.resetCustomers();
  });

  test("should return mock customers", () => {
    const customers = service.getAllCustomers();
    expect(customers.length).toBe(3);
  });

  test("should create customer", () => {
    const result = service.createCustomer({
      name: "Test User",
      email: "test@example.com",
      phone: "9000011111",
      city: "Mumbai"
    });

    expect(result.error).toBeUndefined();
    expect(result.data.id).toBe(4);
  });

  test("should fail with validation error", () => {
    const result = service.createCustomer({
      name: "",
      email: "",
      phone: "",
      city: ""
    });

    expect(result.error).toBeDefined();
  });

  test("should update existing customer", () => {
    const result = service.updateCustomer(1, {
      name: "John Updated",
      email: "updated@example.com",
      phone: "1111111111",
      city: "Pune"
    });

    expect(result.data.name).toBe("John Updated");
  });

  test("should delete customer", () => {
    const result = service.deleteCustomer(1);
    expect(result.data.id).toBe(1);
    expect(service.getAllCustomers().length).toBe(2);
  });
});
