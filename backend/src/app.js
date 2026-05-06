/**
 * Express application setup.
 * Separate from server.js to allow supertest to import the app without starting a live server.
 */

const express = require("express");
const cors = require("cors");

const customerRoutes = require("./routes/customerRoutes");
const { errorHandler, notFoundHandler } = require("./middleware/errorHandler");

const app = express();

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ── Routes ────────────────────────────────────────────────────────────────────
app.use("/api/customers", customerRoutes);

// Health check
app.get("/health", (req, res) => res.json({ status: "ok" }));

// ── Error handling ────────────────────────────────────────────────────────────
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
