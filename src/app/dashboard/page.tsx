// src/app/dashboard/page.tsx
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { handleSignOut } from "@/hooks/auth-actions"

export default async function DashboardPage() {
  const session = await auth()
  if (!session) redirect("/sign-in")

  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Button onClick={handleSignOut} variant="outline">Sign Out</Button>
      </div>
      <p className="mt-4">Welcome {session.user.name}</p>
    </div>
  )
}