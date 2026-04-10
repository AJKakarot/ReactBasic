"use client";

import { useState } from "react";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    alert("Signup done");
  };

  return (
    <div>
      <h1>Signup</h1>
      <input onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input onChange={e => setPassword(e.target.value)} placeholder="Password" />
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
}