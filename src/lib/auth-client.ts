// src/lib/auth-client.ts
import { createAuthClient } from "better-auth/react"

export const { signIn, signUp, signOut, useSession } = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL
})

// export const { signIn, signUp, signOut, useSession } = createAuthClient({
//     baseURL: process.env.BETTER_AUTH_URL!,
//     onError: (error: Error) => {
//         console.error('Auth client error:', error)
//     }
// })

// export const authClient = createAuthClient({
//     baseURL: process.env.BETTER_AUTH_URL,
// })