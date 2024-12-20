import { PrismaClient } from "@prisma/client"

// Singleton function to create a new PrismaClient instance
const prismaClientSingleton = () => {
    return new PrismaClient()
}

// Declare the global type for PrismaClient in the development environment
declare const globalThis: {
    prismaGlobal: ReturnType<typeof prismaClientSingleton>
} & typeof global

// Use the global instance in development mode, or create a new one in production
const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

// Export the Prisma Client instance
export default prisma

// In development mode, assign the global instance to avoid multiple instances
if (process.env.NODE_ENV !== "production") {
    globalThis.prismaGlobal = prisma
}