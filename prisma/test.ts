import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function testConnection() {
    try {
        // Test database connection
        await prisma.$connect()
        console.log('Successfully connected to database')

        // Test table existence
        const tables = await prisma.$queryRaw`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public'
        `
        console.log('Available tables:', tables)

        await prisma.$disconnect()
    } catch (error) {
        console.error('Database connection error:', error)
        process.exit(1)
    }
}

testConnection()