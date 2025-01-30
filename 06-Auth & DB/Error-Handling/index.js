const jwt = require("jsonwebtoken");

const value = {
  name: "Test 1",
  accNum: 987654321,
};

// Sign the token with an expiration time of 1 hour
const token = jwt.sign(value, "secret", { expiresIn: "1h" });
console.log("Token:", token);

// Decode the token (without verification)
const decodedValue = jwt.decode(token);
console.log("Decoded Value:", decodedValue);

// Verify the token (with signature verification)
try {
  const verifiedValue = jwt.verify(token, "secret");
  console.log("Verified Value:", verifiedValue);
} catch (err) {
  console.error("Token verification failed:", err.message);
}
