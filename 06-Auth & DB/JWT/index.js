const jwt = require("jsonwebtoken");

const value = {
  name: "Test 1",
  accNum: 987654321,
};

const token = jwt.sign(value, "secret", { expiresIn: "1h" });
console.log(token);

const decodedValue = jwt.decode(token);
console.log(decodedValue);

const verifiedValue = jwt.verify(token, "secret");
console.log(verifiedValue);

// Result
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGVzdCAxIiwiYW88NjTnVtIjo5ODc2NTQzMjEsImlhdCI6MTczODIyMDE1N30.RTQvzL43U6OA42huuy_18iMcP0iNkiVFjkm0Rv3
// -L8Q
// { name: 'Test 1', accNum: 987654321, iat: 1738220157 }
// { name: 'Test 1', accNum: 987654321, iat: 1738220157 }

/*-----------------*/
/* Key Differences Between jwt.decode() and jwt.verify():
jwt.decode() :
Only decodes the token without verifying its authenticity.
Useful for reading the contents of a token without checking if it's valid.
Does not check the signature, so it's unsafe to use for sensitive operations.
jwt.verify() :
Decodes and verifies the token's signature using the secret key.
Ensures that the token has not been tampered with and that it was issued by a trusted source.
Throws an error if the token is invalid (e.g., wrong secret, expired, or tampered).*/
