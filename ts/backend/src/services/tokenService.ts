import jwt from "jsonwebtoken";
import type { JwtPayload, Role } from "../models/types.js";

const JWT_SECRET = process.env.JWT_SECRET ?? "dev-only-change-me";
const JWT_EXPIRES = "7d";

function parseSub(value: unknown): number {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim() !== "") {
    const n = Number(value);
    if (Number.isFinite(n)) return n;
  }
  throw new Error("Invalid token subject");
}

export function signToken(userId: number, role: Role): string {
  const payload: JwtPayload = { sub: userId, role };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES });
}

export function verifyToken(token: string): JwtPayload {
  const decoded = jwt.verify(token, JWT_SECRET);
  if (typeof decoded !== "object" || decoded === null) {
    throw new Error("Invalid token");
  }
  const { sub, role } = decoded as Record<string, unknown>;
  const id = parseSub(sub);
  if (role !== "admin" && role !== "user") {
    throw new Error("Invalid token payload");
  }
  return { sub: id, role };
}
