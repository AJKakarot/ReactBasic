import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import todoRoutes from "./routes/todo.routes.js";
import errorHandler from "./middleware/error.middleware.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);

// error middleware
app.use(errorHandler);

app.listen(process.env.PORT, () =>
  console.log(`Server running on ${process.env.PORT}`)
);


// “I followed MVC architecture — models handle DB, controllers handle logic, routes define endpoints. 
// I used JWT for authentication, middleware for protected routes, asyncHandler for error handling,
//  and environment variables for security.”

// Flow (Explain This in detail)
// User signup/login
// JWT token generated
// Token sent in header
// Middleware verifies token
// User creates todos
// Killer Line

// “I built a scalable backend using Express, MongoDB, JWT auth, middleware, and proper error handling.”


// “In production, I hash passwords using bcrypt before storing them, and during login 
// I compare hashed passwords securely. I also validate incoming requests using Zod to ensure data integrity 
// and prevent invalid inputs.
//  Additionally, I handle validation errors centrally using middleware.”