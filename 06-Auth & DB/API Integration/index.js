const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const app = express();

app.use(express.json());

const users = [];

const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

// Logging middleware
function logger(req, res, next) {
  console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
  next();
}

// Serve static files from the public directory
app.use(express.static("public"));

// Root route to serve the index.html file
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

/**
 * POST /signup - User signup route
 * Allows users to create an account if they meet the criteria.
 */
app.post("/signup", logger, async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required." });
    }
    if (username.length < 5) {
      return res
        .status(400)
        .json({ message: "Username must have at least 5 characters." });
    }

    if (users.find((user) => user.username === username)) {
      return res.status(400).json({ message: "You are already signed up!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    users.push({ username, password: hashedPassword });

    res.status(201).json({ message: "You have signed up successfully!" });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

/**
 * POST /signin - User signin route
 * Allows users to log in and receive a JWT token if their credentials are valid.
 */
app.post("/signin", logger, async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required." });
    }

    const user = users.find((user) => user.username === username);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid username or password!" });
    }

    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });

    res.json({ message: "You have signed in successfully!", token });
  } catch (error) {
    console.error("Error during signin:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

/**
 * Middleware: auth
 * Verifies if the user is logged in by checking the JWT token in the request headers.
 */
function auth(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Token is missing!" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    res.status(401).json({ message: "Invalid or expired token!" });
  }
}

/**
 * GET /me - Protected route
 * Returns the currently logged-in user's information.
 */
app.get("/me", logger, auth, (req, res) => {
  const { username } = req.user;

  const user = users.find((user) => user.username === username);

  if (!user) {
    return res.status(404).json({ message: "User not found!" });
  }

  res.json({ username });
});

/**
 * Start the server on port 3000
 */
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
