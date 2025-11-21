"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import dynamic from "next/dynamic";

// 🔥 Loader dynamique sans SSR
const Loader = dynamic(() => import("@/components/ui/loader"), { ssr: false });

interface Props {
  children: ReactNode;
  requiresAuth?: boolean; // true = page protégée, false = page auth
  redirectAuthenticatedTo?: string; // chemin si l’utilisateur est connecté sur page auth
  redirectUnauthenticatedTo?: string; // chemin si pas connecté sur page protégée
}

export default function ProtectedRoute({
  children,
  requiresAuth = true,
  redirectAuthenticatedTo = "/",
  redirectUnauthenticatedTo = "/login",
}: Props) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (requiresAuth && !isAuthenticated) {
        router.replace(redirectUnauthenticatedTo);
      } else if (!requiresAuth && isAuthenticated) {
        router.replace(redirectAuthenticatedTo);
      }
    }
  }, [
    loading,
    isAuthenticated,
    requiresAuth,
    redirectAuthenticatedTo,
    redirectUnauthenticatedTo,
    router,
  ]);

  if (loading) {
    return (
        <Loader />
    );
  }

  // 🚫 Si on doit rediriger, ne rien rendre
  if ((requiresAuth && !isAuthenticated) || (!requiresAuth && isAuthenticated)) {
    return null;
  }

  // ✅ Sinon, afficher le contenu
  return <>{children}</>;
}
