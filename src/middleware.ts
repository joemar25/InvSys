// src/middleware.ts
import { auth } from "@/lib/auth"
import { NextRequest } from "next/server"
import { NextResponse } from "next/server"

export async function middleware(request: NextRequest) {
    const session = await auth()
    const { pathname } = request.nextUrl

    // Auth routes handling
    if (pathname === "/sign-in" || pathname === "/sign-up") {
        if (session) {
            return NextResponse.redirect(new URL("/dashboard", request.url))
        }
        return NextResponse.next()
    }

    // Protected routes
    if (pathname.startsWith("/dashboard")) {
        if (!session) {
            return NextResponse.redirect(new URL("/sign-in", request.url))
        }
        return NextResponse.next()
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/sign-in",
        "/sign-up"
    ]
}