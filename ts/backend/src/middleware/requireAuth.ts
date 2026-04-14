import type { NextFunction, Request, Response } from "express";
import { verifyToken } from "../services/tokenService.js";
import { findUserById } from "../models/store.js";
import type { Role } from "../models/types.js";

export type AuthedRequest = Request & {
  userId: number;
  role: Role;
};

export function requireAuth(req: Request, res: Response, next: NextFunction): void {
  const header = req.headers.authorization;
  const token = header?.startsWith("Bearer ") ? header.slice(7) : undefined;
  if (!token) {
    res.status(401).json({ data: null, success: false, message: "Missing token" });
    return;
  }
  try {
    const { sub, role } = verifyToken(token);
    const user = findUserById(sub);
    if (!user) {
      res.status(401).json({ data: null, success: false, message: "User not found" });
      return;
    }
    (req as AuthedRequest).userId = sub;
    (req as AuthedRequest).role = role;
    next();
  } catch {
    res.status(401).json({ data: null, success: false, message: "Invalid token" });
  }
}
