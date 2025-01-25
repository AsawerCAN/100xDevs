import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import {
  createTodo,
  updateTodo,
  getTodos,
  deleteTodo,
} from "../controllers/todo.controller.js";

const router = express.Router();

router.post("/create", protectRoute, createTodo);
router.patch("/:id", protectRoute, updateTodo);
router.get("/", protectRoute, getTodos);
router.get("/:id", protectRoute, getTodos);
router.delete("/delete/:id", protectRoute, deleteTodo);

export default router;
