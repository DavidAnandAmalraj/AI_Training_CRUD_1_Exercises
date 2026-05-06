/**
 * Server entry point.
 * Starts the HTTP server on the configured port.
 */

const app = require("./app");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅  Customer CRUD API is running on http://localhost:${PORT}`);
});
