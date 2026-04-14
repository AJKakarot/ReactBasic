import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { api, unwrapApi } from "../api";
import type { ApiResponse, AuthBundle, Role } from "../types.js";

export function AuthScreen() {
  const { login } = useAuth();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("user");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const path = mode === "login" ? "/api/auth/login" : "/api/auth/signup";
      const payload =
        mode === "login"
          ? { name, password }
          : { name, password, role };
      const raw = await api<ApiResponse<AuthBundle>>(path, {
        method: "POST",
        body: JSON.stringify(payload),
      });
      const bundle = unwrapApi(raw);
      login(bundle.token, bundle.user);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="layout">
      <div className="card">
        <h1>{mode === "login" ? "Log in" : "Sign up"}</h1>
        <p className="muted">
          Demo: <code>Ajeet</code> / <code>admin123</code> · <code>Rahul</code> /{" "}
          <code>rahul123</code>
        </p>
        <form onSubmit={submit} className="stack">
          <label>
            Name
            <input
              type="text"
              autoComplete="username"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              autoComplete={mode === "login" ? "current-password" : "new-password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </label>
          {mode === "signup" && (
            <label>
              Role (demo — server keeps admin only for seeded / env name)
              <select value={role} onChange={(e) => setRole(e.target.value as Role)}>
                <option value="user">user</option>
                <option value="admin">admin (stored as user unless ADMIN_NAME)</option>
              </select>
            </label>
          )}
          {error && <p className="error">{error}</p>}
          <button type="submit" disabled={loading}>
            {loading ? "Please wait…" : mode === "login" ? "Log in" : "Create account"}
          </button>
        </form>
        <p className="muted small">
          {mode === "login" ? "No account? " : "Already have an account? "}
          <button
            type="button"
            className="link"
            onClick={() => {
              setMode(mode === "login" ? "signup" : "login");
              setError(null);
            }}
          >
            {mode === "login" ? "Sign up" : "Log in"}
          </button>
        </p>
      </div>
    </div>
  );
}
