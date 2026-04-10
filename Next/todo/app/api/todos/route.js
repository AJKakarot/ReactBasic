// app/api/todos/route.js

import { todos } from "@/lib/store";

export async function GET() {
  return Response.json(todos);
}

export async function POST(req) {
  const body = await req.json();

  todos.push({ text: body.text });

  return Response.json({ message: "Todo added" });
}