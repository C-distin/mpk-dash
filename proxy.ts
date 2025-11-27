import { NextResponse, type NextRequest } from "next/server"
import { auth } from "./lib/auth"

export async function proxy(request: NextRequest) {
  if (request.nextUrl.pathname !== "/dashboard") {
    return NextResponse.next()
  }

  const session = await auth.api.getSession()

  if (!session) {
    return NextResponse.redirect(new URL("/sign-in", request.url))
  }

  const role = session.user.role

  if (role === "admin") {
    return NextResponse.redirect(new URL("/admin", request.url))
  }

  return NextResponse.redirect(new URL("/user", request.url))
}

export const config = {
  matcher: ["/dashboard"],
}
