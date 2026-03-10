// Basic Auth Middleware to prevent Node.js module resolution crashes
module.exports = (req, res, next) => {
  // We will build real JWT token verification here later.
  // For now, just let the request pass through safely!
  next();
};
