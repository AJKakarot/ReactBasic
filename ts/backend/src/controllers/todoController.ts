import type { Response } from "express";
import type { AuthedRequest } from "../middleware/requireAuth.js";
import type { UpdateTodo } from "../models/types.js";
import * as todoService from "../services/todoService.js";

function parseTodoId(raw: string | string[] | undefined): number | null {
  const s = Array.isArray(raw) ? raw[0] : raw;
  if (s === undefined || s === "") return null;
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
}

export function list(req: AuthedRequest, res: Response): void {
  const body = todoService.listForActor(req.userId, req.role);
  res.json(body);
}

export function create(req: AuthedRequest, res: Response): void {
  const text = typeof req.body?.text === "string" ? req.body.text : "";
  const body = todoService.addTodo(req.userId, text);
  if (!body.success) {
    res.status(400).json(body);
    return;
  }
  res.status(201).json(body);
}

export function remove(req: AuthedRequest, res: Response): void {
  const id = parseTodoId(req.params.id);
  if (id === null) {
    res.status(400).json({ data: null, success: false, message: "Invalid id" });
    return;
  }
  const body = todoService.deleteTodo(req.userId, req.role, id);
  if (!body.success) {
    const code = body.message.includes("admin") ? 403 : 404;
    res.status(code).json(body);
    return;
  }
  res.json(body);
}

export function patch(req: AuthedRequest, res: Response): void {
  const id = parseTodoId(req.params.id);
  if (id === null) {
    res.status(400).json({ data: null, success: false, message: "Invalid id" });
    return;
  }
  const updates = (typeof req.body === "object" && req.body !== null ? req.body : {}) as UpdateTodo;
  const body = todoService.patchTodo(req.userId, req.role, id, updates);
  if (!body.success) {
    const code =
      body.message === "Not allowed" ? 403 : body.message === "Todo not found" ? 404 : 400;
    res.status(code).json(body);
    return;
  }
  res.json(body);
}
