// app/todos/[id]/page.js

import Link from "next/link";

async function getTodo(id) {
  const res = await fetch("http://localhost:3000/api/todos", {
    cache: "no-store",
  });
  const todos = await res.json();

  return todos.find((t) => t.id == id);
}

export default async function TodoDetail({ params }) {
  const todo = await getTodo(params.id);

  if (!todo) return <h1>Not Found</h1>;

  return (
    <div>
      <h1>{todo.title}</h1>
      <p>Status: {todo.completed ? "Done" : "Pending"}</p>

      <Link href="/">⬅ Back</Link>
    </div>
  );
}