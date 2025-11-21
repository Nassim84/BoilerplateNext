// src/services/authService.ts
import { apiClient } from "./apiClient";

export interface RegisterData {
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface User {
  id: number;
  email: string;
  roles?: string[];
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  user?: User;
}

export const authService = {
  // 🧾 Register un utilisateur
  async register(data: RegisterData): Promise<AuthResponse> {
    return apiClient<AuthResponse>("/register", {
      method: "POST",
      body: data,
    });
  },

  // 🔐 Login (le cookie JWT est géré automatiquement par le serveur)
  async login(data: LoginData): Promise<AuthResponse> {
    return apiClient<AuthResponse>("/login_check", {
      method: "POST",
      body: data,
    });
  },

  // 🔄 Récupère l'utilisateur connecté via /api/me
  async me(): Promise<{ user: User }> {
    return apiClient<{ user: User }>("/me");
  },

  // 🚪 Logout (supprime le cookie côté serveur)
  async logout(): Promise<AuthResponse> {
    return apiClient<AuthResponse>("/logout", { method: "POST" });
  },
};
