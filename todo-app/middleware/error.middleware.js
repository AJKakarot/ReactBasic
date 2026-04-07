// middleware/error.middleware.js
import { ZodError } from "zod";

const errorHandler = (err, req, res, next) => {
  // Zod validation error
  if (err instanceof ZodError) {
    return res.status(400).json({
      message: "Validation Error",
      errors: err.errors,
    });
  }

  res.status(res.statusCode || 500).json({
    message: err.message,
  });
};

export default errorHandler;