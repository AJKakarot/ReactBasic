export type Role = "admin" | "user";

export enum Status {
  PENDING = "pending",
  DONE = "done",
}

export interface User {
  id: number;
  name: string;
  role: Role;
}

export interface Todo {
  id: number;
  text: string;
  status: Status;
  createdBy: number;
}

export type ApiResponse<T> =
  | { data: T; success: true }
  | { data: null; success: false; message: string };

export type SafeUser = Omit<User, "role">;

export type UpdateTodo = Partial<Todo>;

export type AuthBundle = { token: string; user: User };
