'use client'

import { toast } from "sonner"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { signUp } from "@/lib/auth-client"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { signUpSchema, SignUpForm } from "@/lib/zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAuthStore } from "@/state/use-auth-store"
import { PasswordInput } from "@/components/custom/general/password-input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

const Home = () => {
  const { formData } = useAuthStore()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
    defaultValues: formData,
  })

  const onSubmit = async (req: SignUpForm) => {
    setIsLoading(true)

    const payload = {
      email: req.email,
      password: req.password,
      name: req.name,
      callbackURL: "/dashboard",
    }

    try {
      await signUp.email(payload, {
        onRequest() {
          toast.info("Requesting...")
        },
        onSuccess() {
          toast.success("Request successful!")
        },
        onError(error) {
          toast.error(`Error: ${error || "Unknown error occurred"}`)
          form.reset()
        },
      })
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const fields = [
    { name: "name", label: "Name", type: "text", placeholder: "Enter your name" },
    { name: "email", label: "Email", type: "email", placeholder: "Enter your email" },
  ] as const

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-xl font-semibold mb-4">Create an Account</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {fields.map((field) => (
              <FormField
                key={field.name}
                control={form.control}
                name={field.name}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{field.name === "name" ? "Name" : "Email"}</FormLabel>
                    <FormControl>
                      <Input
                        type={fields.find(f => f.name === field.name)?.type}
                        placeholder={fields.find(f => f.name === field.name)?.placeholder}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
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
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Confirm your password"
                      name="confirmPassword"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button variant="outline" type="submit" disabled={isLoading} className="w-full">
              {isLoading ? "Signing Up..." : "Sign Up"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default Home