import type { Request, Response } from "express";
import type { Role } from "../models/types.js";
import * as authService from "../services/authService.js";

function roleFromBody(body: unknown): Role {
  const r = typeof body === "object" && body !== null && "role" in body ? (body as { role?: unknown }).role : undefined;
  return r === "admin" || r === "user" ? r : "user";
}

export async function signup(req: Request, res: Response): Promise<void> {
  const name = typeof req.body?.name === "string" ? req.body.name : "";
  const password = typeof req.body?.password === "string" ? req.body.password : "";
  const role = roleFromBody(req.body);
  const result = await authService.signup(name, password, role);
  if (!result.success) {
    res.status(result.message.includes("registered") ? 409 : 400).json(result);
    return;
  }
  res.status(201).json(result);
}

export async function login(req: Request, res: Response): Promise<void> {
  const name = typeof req.body?.name === "string" ? req.body.name : "";
  const password = typeof req.body?.password === "string" ? req.body.password : "";
  const result = await authService.login(name, password);
  if (!result.success) {
    res.status(401).json(result);
    return;
  }
  res.json(result);
}
