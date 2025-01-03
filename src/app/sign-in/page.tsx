// src/app/sign-in/page.tsx
'use client'

import { toast } from "sonner"
import { useState } from "react"
import { Github } from "lucide-react"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { signInSchema, SignInForm } from "@/lib/zod"
import { Separator } from "@/components/ui/separator"
import { zodResolver } from "@hookform/resolvers/zod"
import { PasswordInput } from "@/components/custom/general/password-input"
import { handleCredentialsSignin, handleGithubSignin } from "@/hooks/auth-actions"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

const Page = () => {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<SignInForm>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (values: SignInForm) => {
    setIsLoading(true)
    const result = await handleCredentialsSignin(values)

    if (result?.message) {
      toast.error(result.message)
    }
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-xl font-semibold mb-4">Sign In</h1>
        <Button
          variant="outline"
          onClick={handleGithubSignin}
          className="w-full mb-4"
        >
          <Github className="mr-2 h-4 w-4" />
          Continue with Github
        </Button>

        <div className="relative mb-4">
          <Separator />
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-muted-foreground">
            or
          </span>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Enter your password"
                      name="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button variant="outline" type="submit" disabled={isLoading} className="w-full">
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default Page