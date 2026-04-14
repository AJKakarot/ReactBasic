import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { api, unwrapApi } from "../api";
import type { ApiResponse, Todo, UpdateTodo } from "../types.js";
import { Status } from "../types.js";

export function TodoScreen() {
  const { token, user, logout } = useAuth();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    if (!token) return;
    setError(null);
    try {
      const raw = await api<ApiResponse<Todo[]>>("/api/todos", { token });
      setTodos(unwrapApi(raw));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load todos");
    }
  }, [token]);

  useEffect(() => {
    void load();
  }, [load]);

  async function addTodo(e: React.FormEvent) {
    e.preventDefault();
    if (!token) return;
    const trimmed = text.trim();
    if (!trimmed) return;
    setLoading(true);
    setError(null);
    try {
      const raw = await api<ApiResponse<Todo>>("/api/todos", {
        method: "POST",
        token,
        body: JSON.stringify({ text: trimmed }),
      });
      unwrapApi(raw);
      setText("");
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not add todo");
    } finally {
      setLoading(false);
    }
  }

  async function removeTodo(id: number) {
    if (!token || user?.role !== "admin") return;
    setError(null);
    try {
      const raw = await api<ApiResponse<string>>(`/api/todos/${id}`, {
        method: "DELETE",
        token,
      });
      unwrapApi(raw);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not delete");
    }
  }

  async function patchTodo(id: number, patch: UpdateTodo) {
    if (!token) return;
    setError(null);
    try {
      const raw = await api<ApiResponse<Todo>>(`/api/todos/${id}`, {
        method: "PATCH",
        token,
        body: JSON.stringify(patch),
      });
      unwrapApi(raw);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not update");
    }
  }

  return (
    <div className="layout wide">
      <header className="topbar">
        <div>
          <h1>Todos</h1>
          <p className="muted small">
            Signed in as <strong>{user?.name}</strong> ({user?.role})
          </p>
        </div>
        <button type="button" className="secondary" onClick={logout}>
          Log out
        </button>
      </header>

      <div className="card">
        <form onSubmit={addTodo} className="row">
          <input
            placeholder="New todo…"
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={loading}
          />
          <button type="submit" disabled={loading || !text.trim()}>
            Add
          </button>
        </form>
        {user?.role === "user" && (
          <p className="muted small">Users add todos; only admin can delete.</p>
        )}
        {error && <p className="error">{error}</p>}
      </div>

      <ul className="todo-list">
        {todos.map((t) => (
          <li key={t.id} className="todo-item">
            <div>
              <p className="todo-text">{t.text}</p>
              <p className="muted small">
                <span className={`badge ${t.status}`}>{t.status}</span>
                {user?.role === "admin" && (
                  <>
                    {" · "}
                    <span>by user #{t.createdBy}</span>
                  </>
                )}
              </p>
            </div>
            <div className="todo-actions">
              {t.status === Status.PENDING ? (
                <button
                  type="button"
                  className="secondary"
                  onClick={() => void patchTodo(t.id, { status: Status.DONE })}
                >
                  Mark done
                </button>
              ) : (
                <button
                  type="button"
                  className="secondary"
                  onClick={() => void patchTodo(t.id, { status: Status.PENDING })}
                >
                  Reopen
                </button>
              )}
              {user?.role === "admin" && (
                <button type="button" className="danger" onClick={() => void removeTodo(t.id)}>
                  Delete
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
      {todos.length === 0 && <p className="muted center">No todos yet.</p>}
    </div>
  );
}
