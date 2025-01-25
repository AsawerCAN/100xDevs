import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectToMongoDB from "./lib/db.js";
import authRoutes from "./routes/auth.routes.js";
import todoRoutes from "./routes/todo.routes.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Health Check passed",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/todo", todoRoutes);

app.listen(PORT, async () => {
  console.log(`Server running on PORT ${PORT}`);
  await connectToMongoDB();
});
