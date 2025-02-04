const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { z } = require("zod");
const { UserModel, TodoModel } = require("./db");
const { auth, JWT_SECRET } = require("./auth");

// Connect to MongoDB
mongoose
  .connect("process.env.MONGO_URI")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Zod schema for signup request body
const signupSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .refine(
      (password) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
          password
        ),
      "Password must include uppercase, lowercase, numbers, and special characters"
    ),
  name: z.string().min(3, "Name must be at least 3 characters"),
});

// Signup Route
app.post("/signup", async (req, res) => {
  const parsedBody = signupSchema.safeParse(req.body);

  if (!parsedBody.success) {
    return res.status(400).json({
      message: "Validation failed",
      errors: parsedBody.error.flatten().fieldErrors,
    });
  }

  const { email, password, name } = parsedBody.data;

  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists!" });
    }

    await UserModel.create({ email, password, name });

    res.status(201).json({ message: "You are signed up!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Signin Route
app.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(403).json({ message: "User does not exist!" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(403).json({ message: "Incorrect credentials!" });
    }

    const token = jwt.sign({ id: user._id.toString() }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token, message: "You are signed in!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Create a new Todo
app.post("/todo", auth, async (req, res) => {
  const { title, done } = req.body;
  const userId = req.userId;

  try {
    const todo = await TodoModel.create({ title, done, userId });
    res.status(201).json({ message: "Todo created", todo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get all Todos for a user
app.get("/todos", auth, async (req, res) => {
  const userId = req.userId;

  try {
    const todos = await TodoModel.find({ userId }).sort({ createdAt: -1 });
    res.json({ todos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});
