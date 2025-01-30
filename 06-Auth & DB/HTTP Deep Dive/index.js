const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

// Use the express.json() middleware to parse JSON request bodies
app.use(express.json());

// Array to store user credentials (username and password)
const users = [];
const JWT_SECRET = "jhdf78567549HSD*&98J";

/**
 * POST /signup - User signup route
 * Allows users to create an account if they meet the criteria.
 */
app.post("/signup", function (req, res) {
  const { username, password } = req.body;

  // Check if the user already exists in the `users` array
  if (users.find((user) => user.username === username)) {
    return res.status(400).json({
      message: "User already registered",
    });
  }

  // Validate that the username has at least 3 characters
  if (username.length < 3) {
    return res.status(400).json({
      message: "Username must have at least 3 characters.",
    });
  }

  // Add the new user to the `users` array
  users.push({ username, password });

  // Respond with a success message
  res.status(201).json({
    message: "User Register Successfully!",
  });
});

/**
 * POST /signin - User signin route
 * Allows users to log in and receive a JWT token if their credentials are valid.
 */
app.post("/signin", function (req, res) {
  const { username, password } = req.body;

  // Find the user in the `users` array
  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  // If the user is not found, respond with an error
  if (!user) {
    return res.status(401).json({
      message: "Invalid Credentials!",
    });
  }

  // Generate a JWT token for the authenticated user
  const token = jwt.sign({ username: user.username }, JWT_SECRET);

  // Respond with the token
  res.json({
    message: "SignedIn Successfully!",
    token,
  });
});

/**
 * Middleware: auth
 * Verifies if the user is logged in by checking the JWT token in the request headers.
 */
function auth(req, res, next) {
  // Extract the token from the Authorization header
  const token = req.headers.authorization;

  // If no token is provided, respond with an error
  if (!token) {
    return res.status(401).json({
      message: "Token is missing!",
    });
  }

  // Verify the token using the JWT_SECRET
  jwt.verify(token, JWT_SECRET, function (err, decoded) {
    if (err) {
      // If verification fails, respond with an error
      return res.status(401).json({
        message: "Unauthorized!",
      });
    }

    // Attach the decoded user information to the request object
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  });
}

/**
 * GET /me - Protected route
 * Returns the currently logged-in user's information.
 */
app.get("/me", auth, function (req, res) {
  // Retrieve the user information from the request object
  const { username } = req.user;

  // Respond with the user's username
  res.json({
    username,
  });
});

/**
 * Start the server on port 3000
 */
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
