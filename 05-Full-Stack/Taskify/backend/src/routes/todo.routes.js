import express from "express";
import { createTodo, updateTodo } from "../controllers/todo.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/create", protectRoute, createTodo);
router.patch("/:id", protectRoute, updateTodo);

export default router;
