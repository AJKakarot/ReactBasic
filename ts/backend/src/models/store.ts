import type { StoredUser, Todo } from "./types.js";

/** Core in-memory tables (interview-style “let arrays = source of truth”) */
let users: StoredUser[] = [];
let todos: Todo[] = [];

let userId = 1;
let todoId = 1;

export function takeUserId(): number {
  return userId++;
}

export function takeTodoId(): number {
  return todoId++;
}

export function findUserByName(name: string): StoredUser | undefined {
  const n = name.trim().toLowerCase();
  return users.find((u) => u.name.toLowerCase() === n);
}

export function findUserById(id: number): StoredUser | undefined {
  return users.find((u) => u.id === id);
}

export function pushUser(user: StoredUser): void {
  users.push(user);
}

export function listTodos(): Todo[] {
  return [...todos].sort((a, b) => b.id - a.id);
}

export function pushTodo(todo: Todo): void {
  todos.push(todo);
}

export function getTodo(id: number): Todo | undefined {
  return todos.find((t) => t.id === id);
}

export function deleteTodoById(id: number): boolean {
  const before = todos.length;
  todos = todos.filter((t) => t.id !== id);
  return todos.length < before;
}

export function applyTodoUpdate(id: number, patch: Partial<Todo>): Todo | undefined {
  const todo = todos.find((t) => t.id === id);
  if (!todo) return undefined;
  Object.assign(todo, patch);
  return todo;
}
