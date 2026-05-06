const request = require("supertest");
const app = require("../../src/app");
const service = require("../../src/services/customer.service");

describe("customer API", () => {
  beforeEach(() => {
    service.resetCustomers();
  });

  test("GET /api/customers should return customers", async () => {
    const response = await request(app).get("/api/customers");
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(3);
  });

  test("POST /api/customers should create customer", async () => {
    const response = await request(app).post("/api/customers").send({
      name: "Neha",
      email: "neha@example.com",
      phone: "9999999999",
      city: "Delhi"
    });

    expect(response.status).toBe(201);
    expect(response.body.id).toBe(4);
  });

  test("PUT /api/customers/:id should update customer", async () => {
    const response = await request(app).put("/api/customers/2").send({
      name: "Priya Updated",
      email: "priya.updated@example.com",
      phone: "9888888888",
      city: "Coimbatore"
    });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Priya Updated");
  });

  test("DELETE /api/customers/:id should delete customer", async () => {
    const response = await request(app).delete("/api/customers/3");
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Customer deleted");
  });
});
