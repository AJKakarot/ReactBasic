"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState<{ text: string }[]>([]);
  const router = useRouter();

  const loadTodos = async () => {
    const res = await fetch("/api/todos");
    const data = await res.json();
    setTodos(data);
  };

  const addTodo = async () => {
    if (!text) return;

    await fetch("/api/todos", {
      method: "POST",
      body: JSON.stringify({ text }),
    });

    setText("");
    loadTodos();
  };

  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      {/* 🔥 Navigation Buttons */}
      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => router.push("/login")}>Login</button>
        <button onClick={() => router.push("/signup")}>Signup</button>
      </div>

      {/* 🔥 Todo Section */}
      <h1>Todo App</h1>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter todo"
      />

      <button onClick={addTodo}>Add</button>

      <ul>
        {todos.map((t, i) => (
          <li key={i}>{t.text}</li>
        ))}
      </ul>
    </div>
  );
}