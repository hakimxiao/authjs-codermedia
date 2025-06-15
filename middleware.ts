// middleware.ts
import { auth } from "@/auth" // gunakan path sesuai project Anda
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const session = await auth()

  const isLoggedIn = !!session?.user
  const pathname = request.nextUrl.pathname

  const protectedRoutes = ["/dashboard", "/user", "/product"]

  // Redirect ke /login jika belum login dan akses halaman terlindungi
  if (!isLoggedIn && protectedRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // Redirect ke /dashboard jika sudah login tapi akses /login
  if (isLoggedIn && pathname === "/login") {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

// Tentukan URL yang akan dilewati oleh middleware
export const config = {
  matcher: ["/dashboard", "/user", "/product", "/login"],
}

