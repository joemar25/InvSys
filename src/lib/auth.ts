// src/lib/auth.ts
import { betterAuth } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma"
import prisma from "./prisma"

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql"
    }),

    emailAndPassword: {
        enabled: true,
    },

    debug: true,

    secret: process.env.BETTER_AUTH_SECRET!,
    baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
})


// // src/lib/auth.ts
// import { betterAuth } from "better-auth"
// import { prismaAdapter } from "better-auth/adapters/prisma"
// import prisma from "./prisma"

// // import { PrismaClient } from "@prisma/client" -old
// // const prisma = new PrismaClient() -old
// // database: prismaAdapter(prisma, { - old

// export const auth = betterAuth({
//     // selected database provider
//     database: prismaAdapter(prisma, {
//         provider: "postgresql"
//     }),

//     // selected authentication method(s)
//     emailAndPassword: {
//         enabled: true,
//         // requireEmailVerification: false,
//     },

//     // selected social authentication provider(s)
//     // socialProviders: {
//     //     github: {
//     //         enabled: true,
//     //         clientId: process.env.GITHUB_CLIENT_ID!,
//     //         clientSecret: process.env.GITHUB_CLIENT_SECRET!,
//     //         redirectUri: process.env.GITHUB_REDIRECT_URI!,
//     //     }
//     // },
//     secret: process.env.BETTER_AUTH_SECRET,
//     baseURL: process.env.BETTER_AUTH_URL,
// })

// // run `npx @better-auth/cli migrate` if sqlite