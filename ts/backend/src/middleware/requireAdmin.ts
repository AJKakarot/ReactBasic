import type { NextFunction, Request, Response } from "express";
import type { AuthedRequest } from "./requireAuth.js";

export function requireAdmin(req: Request, res: Response, next: NextFunction): void {
  const r = req as AuthedRequest;
  if (r.role !== "admin") {
    res.status(403).json({ data: null, success: false, message: "Admin only" });
    return;
  }
  next();
}
