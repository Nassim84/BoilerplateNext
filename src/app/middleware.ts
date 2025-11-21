import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Le cookie JWT de Symfony (exemple : "BEARER" ou "JWT_TOKEN")
  const token = request.cookies.get("JWT_TOKEN")?.value;

  const isLoggedIn = !!token;
  const url = request.nextUrl.pathname;

  const protectedRoutes = ["/profile"];

  // Si l'utilisateur essaie d'accéder à une page protégée...
  const isProtected = protectedRoutes.some((route) => url.startsWith(route));

  if (isProtected && !isLoggedIn) {
    // Redirection serveur → instantanée et sans flash
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/profile/:path*", // toutes les sous-pages
  ],
};
