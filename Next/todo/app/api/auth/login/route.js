// app/api/auth/login/route.js

import { users } from "@/lib/store";

export async function POST(req) {
  const body = await req.json();

  const user = users.find(
    u => u.email === body.email && u.password === body.password
  );

  if (!user) {
    return Response.json({ message: "Invalid credentials" }, { status: 401 });
  }

  return Response.json({ message: "Login success" });
}