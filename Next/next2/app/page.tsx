// app/page.js

import Link from "next/link";

async function getTodos() {
  const res = await fetch("http://localhost:3000/api/todos", {
    cache: "no-store", // 🔥 SSR jaisa
  });
  return res.json();
}

interface Todo {
  id: string | number;
  title: string;
}

export default async function Home() {
  const todos = await getTodos();

  return (
    <div>
      <h1>Todo List</h1>

      <Link href="/add">➕ Add Todo</Link>

      {todos.map((todo: Todo) => (
        <div key={todo.id}>
          <Link href={`/todos/${todo.id}`}>
            {todo.title}
          </Link>
        </div>
      ))}
    </div>
  );
}