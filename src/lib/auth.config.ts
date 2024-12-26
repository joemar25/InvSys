// src\lib\auth.config.ts
import Github from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"

import { compare } from "bcryptjs"
import { prisma } from "@/lib/prisma"
import { signInSchema } from "@/lib/zod"
import { NextAuthConfig } from "next-auth"

const authRoutes = ["/auth/sign-in", "/auth/sign-up"]
const publicRoutes = ["/auth/sign-in", "/auth/sign-up"]

export default {
    providers: [
        Github({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        }),
        Credentials({
            credentials: {
                email: { label: "Email", type: "email", placeholder: "Email" },
                password: { label: "Password", type: "password", placeholder: "Password" },
            },
            async authorize(credentials) {
                try {
                    const parsedCredentials = signInSchema.safeParse(credentials)
                    if (!parsedCredentials.success) return null

                    const user = await prisma.user.findUnique({
                        where: { email: credentials.email as string },
                        include: {
                            accounts: {
                                where: { providerId: "credentials" },
                                select: { password: true }
                            }
                        }
                    })

                    if (!user || !user.accounts[0]?.password) return null

                    const isPasswordValid = await compare(
                        credentials.password as string,
                        user.accounts[0].password
                    )
                    if (!isPasswordValid) return null

                    return {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        emailVerified: user.emailVerified,
                        image: user.image,
                        role: user.role ?? '-'
                    }
                } catch (error) {
                    console.error("Auth error:", error)
                    return null
                }
            },
        }),
    ],
    callbacks: {
        authorized({ request: { nextUrl }, auth }) {
            const isLoggedIn = !!auth?.user
            const { pathname } = nextUrl

            // Allow access to public routes for all users
            if (publicRoutes.includes(pathname)) {
                return true
            }

            // Redirect logged-in users away from auth routes
            if (authRoutes.includes(pathname)) {
                if (isLoggedIn) {
                    return Response.redirect(new URL("/", nextUrl))
                }
                return true // Allow access to auth pages if not logged in
            }

            // Allow access if the user is authenticated
            return isLoggedIn
        },
        jwt({ token, user, trigger, session }) {
            if (user) {
                token.id = user.id
                token.role = user.role // Add the `role` field to the JWT
            }
            if (trigger === "update" && session) {
                token = { ...token, ...session }
            }
            return token
        },
        session({ session, token }) {
            session.user.id = token.id as string // Explicitly cast `id` as string
            session.user.role = token.role as string | undefined // Explicitly cast `role` as string | undefined
            return session
        },
    },
    pages: {
        signIn: "/auth/signin",
    },
} satisfies NextAuthConfig