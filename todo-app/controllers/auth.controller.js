// controllers/auth.controller.js
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import asyncHandler from "../utils/asyncHandler.js";
import { signupSchema, loginSchema } from "../utils/validation.js";

export const signup = asyncHandler(async (req, res) => {
  // ✅ Validate input
  const data = signupSchema.parse(req.body);

  // 🔍 Check existing user
  const existingUser = await User.findOne({ email: data.email });
  if (existingUser) {
    res.status(400);
    throw new Error("User already exists");
  }

  // 🔐 Hash password
  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await User.create({
    email: data.email,
    password: hashedPassword,
  });

  res.status(201).json({ message: "User created" });
});

export const login = asyncHandler(async (req, res) => {
  // ✅ Validate input
  const data = loginSchema.parse(req.body);

  const user = await User.findOne({ email: data.email });
  if (!user) {
    res.status(401);
    throw new Error("Invalid credentials");
  }

  // 🔐 Compare password
  const isMatch = await bcrypt.compare(data.password, user.password);
  if (!isMatch) {
    res.status(401);
    throw new Error("Invalid credentials");
  }

  // 🔑 Token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.json({ token });
});