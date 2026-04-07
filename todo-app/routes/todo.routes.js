import express from "express";
import { createTodo, getTodos } from "../controllers/todo.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, createTodo);
router.get("/", authMiddleware, getTodos);

export default router;