// src/services/apiClient.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface ApiOptions {
  method?: HttpMethod;
  body?: unknown;
  headers?: Record<string, string>;
}

/**
 * Client HTTP générique avec gestion du cookie JWT (HTTP-only)
 */
export async function apiClient<T>(
  endpoint: string,
  options: ApiOptions = {}
): Promise<T> {
  const config: RequestInit = {
    method: options.method || "GET",
    credentials: "include", // ✅ envoie le cookie JWT_TOKEN automatiquement
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...(options.body
      ? { body: JSON.stringify(options.body as Record<string, unknown>) }
      : {}),
  };

  const response = await fetch(`${API_URL}${endpoint}`, config);

  if (response.status === 401) {
    throw new Error("Session expirée. Veuillez vous reconnecter.");
  }

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    const message =
      errorBody.message ||
      errorBody.errors?.[0]?.message ||
      `Erreur ${response.status} sur ${endpoint}`;
    throw new Error(message);
  }

  return response.json();
}
