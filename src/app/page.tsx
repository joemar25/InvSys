// src/app/page.tsx
import { auth } from "@/lib/auth"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function Home() {
  const session = await auth()

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-6">Hello World!</h1>
        {session ? (
          <Link href="/dashboard">
            <Button variant="outline">Go to Dashboard</Button>
          </Link>
        ) : (
          <Link href="/sign-in">
            <Button variant="outline">Sign In</Button>
          </Link>
        )}
      </div>
    </div>
  )
}