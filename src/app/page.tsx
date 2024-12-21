import prisma from "@/lib/db"
import { user, object_item, transaction } from "@prisma/client"

export default async function Home() {
  // Get users using the generated Prisma client
  const users: user[] = await prisma.user.findMany()

  // Get objects
  const objects: object_item[] = await prisma.object_item.findMany()

  // Get transactions
  const transactions: transaction[] = await prisma.transaction.findMany()

  return (
    <>
      <div>
        <h1>Users</h1>
        {users.map((user) => (
          <div key={user.id}>{user.name}</div>
        ))}
        <h1>Objects</h1>
        {objects.map((obj) => (
          <div key={obj.id}>{obj.name}</div>
        ))}
        <h1>Transactions</h1>
        {transactions.map((transaction) => (
          <div key={transaction.id}>
            {transaction.status} - {transaction.borrow_date.toString()}
          </div>
        ))}
      </div>
    </>
  )
}