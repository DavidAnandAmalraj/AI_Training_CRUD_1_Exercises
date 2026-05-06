/**
 * Global error handling middleware.
 * Catches any errors that have been passed to next(err) and returns
 * a consistent JSON error response.
 */

function errorHandler(err, req, res, next) {
  console.error("[ErrorHandler]", err.stack || err.message);

  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(status).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack })
  });
}

/**
 * 404 handler – must be registered after all other routes.
 */
function notFoundHandler(req, res) {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
}

module.exports = { errorHandler, notFoundHandler };
