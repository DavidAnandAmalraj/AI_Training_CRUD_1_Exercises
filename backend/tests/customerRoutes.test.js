/**
 * Integration tests for customer API routes.
 * Uses supertest to send HTTP requests to the Express app without starting a live server.
 */

const request = require("supertest");
const app = require("../src/app");
const customerService = require("../src/services/customerService");

// Reset the data store before every test to ensure isolation
beforeEach(() => {
  customerService.resetStore();
});

// ── GET /api/customers ────────────────────────────────────────────────────────
describe("GET /api/customers", () => {
  test("responds with 200 and an array of customers", async () => {
    const res = await request(app).get("/api/customers");
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.count).toBe(res.body.data.length);
  });
});

// ── GET /api/customers/:id ────────────────────────────────────────────────────
describe("GET /api/customers/:id", () => {
  test("responds with 200 and the customer when found", async () => {
    const all = await request(app).get("/api/customers");
    const target = all.body.data[0];

    const res = await request(app).get(`/api/customers/${target.id}`);
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.id).toBe(target.id);
  });

  test("responds with 404 when customer is not found", async () => {
    const res = await request(app).get("/api/customers/non-existent-id");
    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
  });
});

// ── POST /api/customers ───────────────────────────────────────────────────────
describe("POST /api/customers", () => {
  const validPayload = {
    firstName: "Jane",
    lastName: "Doe",
    email: "jane.doe@example.com",
    phone: "+15551234567",
    address: "1 New Street",
    city: "Testville",
    state: "CA",
    zipCode: "90001",
    country: "USA"
  };

  test("responds with 201 and the created customer", async () => {
    const res = await request(app).post("/api/customers").send(validPayload);
    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty("id");
    expect(res.body.data.firstName).toBe(validPayload.firstName);
    expect(res.body.data.email).toBe("jane.doe@example.com");
  });

  test("responds with 400 when required fields are missing", async () => {
    const res = await request(app).post("/api/customers").send({ firstName: "NoEmail" });
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(Array.isArray(res.body.errors)).toBe(true);
  });

  test("responds with 400 for an invalid email address", async () => {
    const res = await request(app)
      .post("/api/customers")
      .send({ ...validPayload, email: "not-an-email" });
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });
});

// ── PUT /api/customers/:id ────────────────────────────────────────────────────
describe("PUT /api/customers/:id", () => {
  test("responds with 200 and the updated customer", async () => {
    const all = await request(app).get("/api/customers");
    const target = all.body.data[0];

    const res = await request(app)
      .put(`/api/customers/${target.id}`)
      .send({ city: "Updated City" });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.city).toBe("Updated City");
    expect(res.body.data.id).toBe(target.id);
  });

  test("responds with 404 when the customer does not exist", async () => {
    const res = await request(app)
      .put("/api/customers/non-existent-id")
      .send({ city: "Nowhere" });
    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
  });

  test("responds with 400 for an invalid email in update payload", async () => {
    const all = await request(app).get("/api/customers");
    const target = all.body.data[0];

    const res = await request(app)
      .put(`/api/customers/${target.id}`)
      .send({ email: "bad-email" });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });
});

// ── DELETE /api/customers/:id ─────────────────────────────────────────────────
describe("DELETE /api/customers/:id", () => {
  test("responds with 200 and a success message", async () => {
    const all = await request(app).get("/api/customers");
    const target = all.body.data[0];

    const res = await request(app).delete(`/api/customers/${target.id}`);
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toMatch(/deleted/i);
  });

  test("customer is no longer retrievable after deletion", async () => {
    const all = await request(app).get("/api/customers");
    const target = all.body.data[0];

    await request(app).delete(`/api/customers/${target.id}`);
    const getRes = await request(app).get(`/api/customers/${target.id}`);
    expect(getRes.status).toBe(404);
  });

  test("responds with 404 when the customer does not exist", async () => {
    const res = await request(app).delete("/api/customers/ghost-id");
    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
  });
});

// ── Health check ──────────────────────────────────────────────────────────────
describe("GET /health", () => {
  test("responds with status ok", async () => {
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("ok");
  });
});

// ── 404 handler ───────────────────────────────────────────────────────────────
describe("Unknown routes", () => {
  test("responds with 404 for unknown routes", async () => {
    const res = await request(app).get("/api/unknown-route");
    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
  });
});
