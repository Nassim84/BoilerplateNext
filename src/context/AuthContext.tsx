"use client";

import React, {
  createContext,
  useContext,
  ReactNode,
  useMemo,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { authService } from "@/services/authService";

interface User {
  id: number;
  email: string;
  roles?: string[];
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  // 🔥 1 seule requête /me() gérée par React Query
  const { data, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: () => authService.me(),
    retry: false,
  });

  const user = data?.user ?? null;
  const isAuthenticated = !!user;

  // 🔐 Login stable avec useCallback
  const login = useCallback(
    async (email: string, password: string) => {
      await authService.login({ email, password });
      await queryClient.invalidateQueries({ queryKey: ["me"] });
      router.push("/");
    },
    [queryClient, router]
  );

  // 🧾 Register stable avec useCallback
  const register = useCallback(
    async (email: string, password: string) => {
      await authService.register({ email, password });
      router.push("/login");
    },
    [router]
  );

  const logout = useCallback(async () => {
    // 1️⃣ Met à jour immédiatement le context
    queryClient.setQueryData(["me"], null);

    // 2️⃣ Appel backend
    try {
      await authService.logout();
    } catch (err) {
      console.error("Erreur logout:", err);
    }

    // 3️⃣ Redirection
    router.push("/");
  }, [queryClient, router]);

  // ✅ Memoisation propre de la valeur du context
  const value = useMemo(
    () => ({
      user,
      isAuthenticated,
      loading: isLoading,
      login,
      register,
      logout,
    }),
    [user, isAuthenticated, isLoading, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// 🔥 Hook pratique pour consommer le context
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
};
