/**
 * Interview-style flow (same ideas as your console snippet).
 * Run from `backend/`: `npx tsx src/demoFlow.ts`
 */
import { Status, type Role, type Todo, type User } from "./models/types.js";

type ApiResponse<T> = { data: T; success: boolean };

let users: User[] = [];
let todos: Todo[] = [];
let userId = 1;
let todoId = 1;

function signup(name: string, role: Role): User {
  const user: User = { id: userId++, name, role };
  users.push(user);
  return user;
}

function login(name: string): User | null {
  return users.find((u) => u.name === name) ?? null;
}

function addTodo(user: User, text: string): ApiResponse<Todo> {
  const todo: Todo = {
    id: todoId++,
    text,
    status: Status.PENDING,
    createdBy: user.id,
  };
  todos.push(todo);
  return { data: todo, success: true };
}

function deleteTodo(user: User, id: number): string {
  if (user.role !== "admin") {
    return "❌ Only admin can delete";
  }
  todos = todos.filter((t) => t.id !== id);
  return "✅ Deleted";
}

type UpdateTodo = Partial<Todo>;

function updateTodo(id: number, updates: UpdateTodo): void {
  const todo = todos.find((t) => t.id === id);
  if (!todo) return;
  Object.assign(todo, updates);
}

const admin = signup("Ajeet", "admin");
const user = signup("Rahul", "user");

addTodo(admin, "Admin Task");
addTodo(user, "User Task");

console.log(deleteTodo(user, 1));
console.log(deleteTodo(admin, 1));

updateTodo(2, { status: Status.DONE });
console.log("After patch, todos:", todos);

console.log("login(Ajeet):", login("Ajeet"));
