# DOCUS

- initialization of the overall application, simple installation and setup for frontend components
- setup ORM and Supabase
  - install prisma (`npm install @prisma/client`)
  - setup prisma (env setup)
  - run migrations (`npx prisma db push`)
  - see prisma db (`npx prisma studio`)
- auth setup (todo)

## Stack

- NextJs
- Prisma
- Supabase / Local (Postgress) / Docker (Postgress)

## Setup (Remake this TODO)

- backend
expressjs - do not use

- server
nodejs (mango db) - do not use

- frontend
nextjs - use supabase or pgsql with docker

## Use cases

- we need a pgsql on our applicaiton instead of supabase because not all clients will use supabase
- so we need to setup prisma with the local pgsql
- we then use the prisma client to interact with the database
- then we use better-auth for authentication and session of the users to the application
- we need better auth to recognize the prisma so we can use the prisma client to interact with the database

## Local Setup (Pg and Pg Admin)

- Download & Install [Postgress](https://www.postgresql.org/download/)
- Create a server (localhost) and a database to be used with prisma, make sure to have them setup with the env file and comment out the direct url of the prisma file

## Docker PgSql

- a
