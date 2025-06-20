const errorHandler = (err, req, res, next) => {
  console.error('🔥 Error:', err);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    status: 'error',
    message: err.message || 'Internal Server Error'
  });
};

module.exports = errorHandler; // ✅ must be a function
