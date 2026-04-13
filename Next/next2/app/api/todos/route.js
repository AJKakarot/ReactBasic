// app/api/todos/route.js

import todos from "../../data/todos";

export async function GET() {
  return Response.json(todos);
}

export async function POST(req) {
  const body = await req.json();

  const newTodo = {
    id: Date.now(),
    title: body.title,
    completed: false,
  };

  todos.push(newTodo);

  return Response.json(newTodo);
}