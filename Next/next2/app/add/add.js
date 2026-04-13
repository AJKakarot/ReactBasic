// app/add/page.js

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddTodo() {
  const [title, setTitle] = useState("");
  const router = useRouter();

  const addTodo = async () => {
    await fetch("/api/todos", {
      method: "POST",
      body: JSON.stringify({ title }),
    });

    router.push("/"); // redirect
  };

  return (
    <div>
      <h1>Add Todo</h1>

      <input onChange={(e) => setTitle(e.target.value)} />
      <button onClick={addTodo}>Add</button>
    </div>
  );
}