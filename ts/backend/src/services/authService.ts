import bcrypt from "bcryptjs";
import {
  findUserByName,
  pushUser,
  takeUserId,
} from "../models/store.js";
import type { ApiResponse, Role, StoredUser, User } from "../models/types.js";
import { signToken } from "./tokenService.js";

export type AuthBundle = { token: string; user: User };

function toPublic(u: StoredUser): User {
  return { id: u.id, name: u.name, role: u.role };
}

export async function signup(
  name: string,
  password: string,
  role: Role,
): Promise<ApiResponse<AuthBundle>> {
  const n = name.trim();
  if (!n || !password) {
    return { data: null, success: false, message: "Name and password required" };
  }
  if (password.length < 6) {
    return { data: null, success: false, message: "Password must be at least 6 characters" };
  }
  if (findUserByName(n)) {
    return { data: null, success: false, message: "Name already registered" };
  }

  const adminBootstrap =
    process.env.ADMIN_NAME &&
    n.toLowerCase() === process.env.ADMIN_NAME.toLowerCase();
  const resolvedRole: Role = adminBootstrap ? "admin" : role === "admin" ? "user" : role;

  const row: StoredUser = {
    id: takeUserId(),
    name: n,
    role: resolvedRole,
    passwordHash: await bcrypt.hash(password, 10),
  };
  pushUser(row);

  return {
    success: true,
    data: { token: signToken(row.id, row.role), user: toPublic(row) },
  };
}

export async function login(
  name: string,
  password: string,
): Promise<ApiResponse<AuthBundle>> {
  const n = name.trim();
  if (!n || !password) {
    return { data: null, success: false, message: "Name and password required" };
  }
  const row = findUserByName(n);
  if (!row || !(await bcrypt.compare(password, row.passwordHash))) {
    return { data: null, success: false, message: "Invalid name or password" };
  }
  return {
    success: true,
    data: { token: signToken(row.id, row.role), user: toPublic(row) },
  };
}
