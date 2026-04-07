import Todo from "../models/todo.model.js";
import asyncHandler from "../utils/asyncHandler.js";

export const createTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    user: req.user.id,
  });

  res.status(201).json(todo);
});

export const getTodos = asyncHandler(async (req, res) => {
  const todos = await Todo.find({ user: req.user.id });
  res.json(todos);
});