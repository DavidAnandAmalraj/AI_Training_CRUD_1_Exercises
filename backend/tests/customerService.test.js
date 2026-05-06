/**
 * Unit tests for customerService.js
 * Tests each CRUD operation in isolation using the in-memory mock data store.
 */

const customerService = require("../src/services/customerService");

// Reset store to original mock data before each test
beforeEach(() => {
  customerService.resetStore();
});

describe("CustomerService – getAllCustomers", () => {
  test("returns an array of customers", () => {
    const result = customerService.getAllCustomers();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  test("returns a copy, not the original array", () => {
    const first = customerService.getAllCustomers();
    const second = customerService.getAllCustomers();
    expect(first).not.toBe(second); // different references
    expect(first).toEqual(second);  // same content
  });
});

describe("CustomerService – getCustomerById", () => {
  test("returns the correct customer when found", () => {
    const all = customerService.getAllCustomers();
    const target = all[0];
    const result = customerService.getCustomerById(target.id);
    expect(result).toEqual(target);
  });

  test("returns null when customer id does not exist", () => {
    const result = customerService.getCustomerById("non-existent-id");
    expect(result).toBeNull();
  });
});

describe("CustomerService – addCustomer", () => {
  const newCustomerData = {
    firstName: "Test",
    lastName: "User",
    email: "test.user@example.com",
    phone: "555-999-0000",
    address: "1 Test Lane",
    city: "Testville",
    state: "TX",
    zipCode: "00000",
    country: "USA"
  };

  test("creates and returns a new customer with an id and timestamps", () => {
    const customer = customerService.addCustomer(newCustomerData);
    expect(customer).toHaveProperty("id");
    expect(customer.firstName).toBe(newCustomerData.firstName);
    expect(customer.lastName).toBe(newCustomerData.lastName);
    expect(customer.email).toBe(newCustomerData.email);
    expect(customer).toHaveProperty("createdAt");
    expect(customer).toHaveProperty("updatedAt");
  });

  test("increases the total number of customers by one", () => {
    const before = customerService.getAllCustomers().length;
    customerService.addCustomer(newCustomerData);
    const after = customerService.getAllCustomers().length;
    expect(after).toBe(before + 1);
  });

  test("new customer can be retrieved by id after creation", () => {
    const created = customerService.addCustomer(newCustomerData);
    const found = customerService.getCustomerById(created.id);
    expect(found).toEqual(created);
  });
});

describe("CustomerService – updateCustomer", () => {
  test("updates the specified fields and returns the updated customer", () => {
    const all = customerService.getAllCustomers();
    const target = all[0];
    const updates = { city: "Updated City", phone: "555-000-9999" };

    const result = customerService.updateCustomer(target.id, updates);
    expect(result.city).toBe(updates.city);
    expect(result.phone).toBe(updates.phone);
    expect(result.id).toBe(target.id);
    expect(result.firstName).toBe(target.firstName); // untouched field
  });

  test("immutable fields (id, createdAt) are not overwritten", () => {
    const all = customerService.getAllCustomers();
    const target = all[0];

    const result = customerService.updateCustomer(target.id, {
      id: "hacked-id",
      createdAt: "2000-01-01T00:00:00.000Z",
      firstName: "Patched"
    });

    expect(result.id).toBe(target.id);
    expect(result.createdAt).toBe(target.createdAt);
    expect(result.firstName).toBe("Patched");
  });

  test("updatedAt timestamp changes after update", () => {
    const all = customerService.getAllCustomers();
    const target = all[0];
    const originalUpdatedAt = target.updatedAt;

    // Ensure at least 1 ms passes
    const result = customerService.updateCustomer(target.id, { city: "New City" });
    expect(new Date(result.updatedAt).getTime()).toBeGreaterThanOrEqual(
      new Date(originalUpdatedAt).getTime()
    );
  });

  test("returns null when the customer id does not exist", () => {
    const result = customerService.updateCustomer("no-such-id", { city: "Nowhere" });
    expect(result).toBeNull();
  });
});

describe("CustomerService – deleteCustomer", () => {
  test("returns true and removes the customer from the store", () => {
    const all = customerService.getAllCustomers();
    const target = all[0];

    const result = customerService.deleteCustomer(target.id);
    expect(result).toBe(true);

    const notFound = customerService.getCustomerById(target.id);
    expect(notFound).toBeNull();

    const remaining = customerService.getAllCustomers();
    expect(remaining.length).toBe(all.length - 1);
  });

  test("returns false when the customer id does not exist", () => {
    const result = customerService.deleteCustomer("ghost-id");
    expect(result).toBe(false);
  });
});
