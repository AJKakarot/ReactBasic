import type { ApiResponse as ApiRes } from "./types.js";

const base = "";

async function parseJson<T>(res: Response): Promise<T> {
  const text = await res.text();
  if (!text) return {} as T;
  return JSON.parse(text) as T;
}

export async function api<T>(
  path: string,
  options: RequestInit & { token?: string | null } = {},
): Promise<T> {
  const headers = new Headers(options.headers);
  headers.set("Content-Type", "application/json");
  if (options.token) headers.set("Authorization", `Bearer ${options.token}`);

  const res = await fetch(`${base}${path}`, {
    ...options,
    headers,
  });

  const body = await parseJson<Record<string, unknown>>(res).catch(() => ({}));

  if (!res.ok) {
    const msg =
      typeof body.message === "string"
        ? body.message
        : typeof body.error === "string"
          ? body.error
          : res.statusText;
    throw new Error(msg);
  }

  return body as T;
}

export function unwrapApi<T>(body: ApiRes<T>): T {
  if (!body.success || body.data === null) {
    throw new Error("message" in body ? body.message : "Request failed");
  }
  return body.data;
}
