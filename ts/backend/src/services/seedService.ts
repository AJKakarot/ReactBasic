import bcrypt from "bcryptjs";
import { findUserByName, pushUser, takeUserId } from "../models/store.js";
import type { StoredUser } from "../models/types.js";

/** Same story as your test flow: Ajeet = admin, Rahul = user */
export async function seedDemoUsers(): Promise<void> {
  if (findUserByName("Ajeet")) return;

  const ajeet: StoredUser = {
    id: takeUserId(),
    name: "Ajeet",
    role: "admin",
    passwordHash: await bcrypt.hash("admin123", 10),
  };
  const rahul: StoredUser = {
    id: takeUserId(),
    name: "Rahul",
    role: "user",
    passwordHash: await bcrypt.hash("rahul123", 10),
  };
  pushUser(ajeet);
  pushUser(rahul);
  console.log("[seed] Ajeet / admin123 (admin) · Rahul / rahul123 (user)");
}
