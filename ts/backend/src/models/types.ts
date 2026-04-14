/** 1) Roles — union type */
export type Role = "admin" | "user";

/** 2) Todo lifecycle — enum */
export enum Status {
  PENDING = "pending",
  DONE = "done",
}

/** 3) User shape — interface (what clients see + id in DB) */
export interface User {
  id: number;
  name: string;
  role: Role;
}

/** Stored row = public user + hash (never send `passwordHash` out) */
export type StoredUser = User & { passwordHash: string };

/** 4) Todo shape — interface */
export interface Todo {
  id: number;
  text: string;
  status: Status;
  createdBy: number;
}

/** Generic API envelope — same idea on wire */
export type ApiResponse<T> =
  | { data: T; success: true }
  | { data: null; success: false; message: string };

/** Utility: hide role (your notes — e.g. “public profile” without permission) */
export type SafeUser = Omit<User, "role">;

/** Utility: PATCH body — any subset of todo fields */
export type UpdateTodo = Partial<Todo>;

export type JwtPayload = {
  sub: number;
  role: Role;
};
