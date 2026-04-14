import {
  applyTodoUpdate,
  deleteTodoById,
  getTodo,
  listTodos,
  pushTodo,
  takeTodoId,
} from "../models/store.js";
import type { ApiResponse, Role, Todo, UpdateTodo } from "../models/types.js";
import { Status } from "../models/types.js";

export function listForActor(userId: number, role: Role): ApiResponse<Todo[]> {
  const all = listTodos();
  const visible = role === "admin" ? all : all.filter((t) => t.createdBy === userId);
  return { data: visible, success: true };
}

export function addTodo(userId: number, text: string): ApiResponse<Todo> {
  const trimmed = text.trim();
  if (!trimmed) {
    return { data: null, success: false, message: "Text required" };
  }
  const todo: Todo = {
    id: takeTodoId(),
    text: trimmed,
    status: Status.PENDING,
    createdBy: userId,
  };
  pushTodo(todo);
  return { data: todo, success: true };
}

export function deleteTodo(_actorId: number, role: Role, id: number): ApiResponse<string> {
  if (role !== "admin") {
    return { data: null, success: false, message: "❌ Only admin can delete" };
  }
  if (!getTodo(id)) {
    return { data: null, success: false, message: "Todo not found" };
  }
  deleteTodoById(id);
  return { data: "✅ Deleted", success: true };
}

export function patchTodo(
  actorId: number,
  actorRole: Role,
  todoId: number,
  updates: UpdateTodo,
): ApiResponse<Todo> {
  const existing = getTodo(todoId);
  if (!existing) {
    return { data: null, success: false, message: "Todo not found" };
  }
  if (actorRole !== "admin" && existing.createdBy !== actorId) {
    return { data: null, success: false, message: "Not allowed" };
  }

  const patch: Partial<Todo> = {};
  if (updates.text !== undefined) {
    const t = typeof updates.text === "string" ? updates.text.trim() : "";
    if (!t) {
      return { data: null, success: false, message: "Text cannot be empty" };
    }
    patch.text = t;
  }
  if (updates.status !== undefined) {
    if (updates.status !== Status.PENDING && updates.status !== Status.DONE) {
      return { data: null, success: false, message: "Invalid status" };
    }
    patch.status = updates.status;
  }

  if (Object.keys(patch).length === 0) {
    return { data: null, success: false, message: "No valid fields to update" };
  }

  const updated = applyTodoUpdate(todoId, patch);
  if (!updated) {
    return { data: null, success: false, message: "Todo not found" };
  }
  return { data: updated, success: true };
}
