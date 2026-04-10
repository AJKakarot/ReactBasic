// app/api/auth/signup/route.js

import { users } from "@/lib/store";

export async function POST(req) {
  const body = await req.json();

  users.push({
    email: body.email,
    password: body.password,
  });

  return Response.json({ message: "User created" });
}