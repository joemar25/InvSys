// src/hooks/device/use-auth-actions.ts
"use server"

import { AuthError } from "next-auth"
import { prisma } from "@/lib/prisma"
import { signUpSchema } from "@/lib/zod"
import { signIn, signOut } from "@/lib/auth"

import bcryptjs from "bcryptjs"

export async function handleCredentialsSignin({ email, password }: {
    email: string,
    password: string
}) {
    try {
        await signIn("credentials", { email, password, redirectTo: "/dashboard" })
    } catch (error) {
        if (error instanceof AuthError) {
            return error.type === 'CredentialsSignin'
                ? { message: 'Invalid credentials' }
                : { message: 'Something went wrong' }
        }
        throw error
    }
}

export async function handleGithubSignin() {
    await signIn("github", { redirectTo: "/" })
}

export async function handleSignOut() {
    await signOut()
}

export async function handleSignUp({ name, email, password, confirmPassword }: {
    name: string,
    email: string,
    password: string,
    confirmPassword: string
}) {
    try {
        const parsedCredentials = signUpSchema.safeParse({ name, email, password, confirmPassword });
        if (!parsedCredentials.success) {
            return { success: false, message: "Invalid data" };
        }

        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return { success: false, message: "Email already exists" };
        }

        const hashedPassword = await bcryptjs.hash(password, 10);
        const now = new Date();

        await prisma.$transaction(async (tx) => {
            const user = await tx.user.create({
                data: {
                    email,
                    name,
                    emailVerified: false,
                    createdAt: now,
                    updatedAt: now,
                }
            });

            await tx.account.create({
                data: {
                    userId: user.id,
                    providerId: "credentials",
                    accountId: email,
                    password: hashedPassword,
                    createdAt: now,
                    updatedAt: now
                }
            });
        });

        return { success: true, message: "Account created successfully" };
    } catch (error) {
        console.error("Signup error:", error);
        return { success: false, message: "An unexpected error occurred" };
    }
}