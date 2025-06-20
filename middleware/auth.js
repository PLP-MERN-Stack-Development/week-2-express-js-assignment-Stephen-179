const API_KEY = process.env.API_KEY || 'my-secret-key';

const auth = (req, res, next) => {
  const clientKey = req.headers['x-api-key'];
  if (clientKey !== API_KEY) {
    return res.status(403).json({ message: 'Unauthorized: Invalid API key' });
  }
  next();
};

module.exports = auth; // ✅ must be a function
