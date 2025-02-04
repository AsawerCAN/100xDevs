const jwt = require("jsonwebtoken");

const JWT_SECRET = "jwt-secret-key";

function auth(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "No token provided!" });
  }

  try {
    const decodedData = jwt.verify(token, JWT_SECRET);
    req.userId = decodedData.id;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid Token!" });
  }
}

module.exports = {
  auth,
  JWT_SECRET,
};
