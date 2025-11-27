"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, Lock, LockKeyhole, Mail, User } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldGroup } from "@/components/ui/field"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { type SignUpData, signUpSchema } from "@/lib/validation/signup"
import { signUp } from "./action"

export function SignUpForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  const onSubmit = async (formData: SignUpData) => {
    setIsLoading(true)

    try {
      const { success, error } = await signUp(formData.name, formData.email, formData.password)

      if (success) {
        toast.success("Sign up successful")
        form.reset()
        router.push("/sign-in")
      } else {
        toast.error(error)
      }

      setIsLoading(false)
    } catch (error) {
      toast.error("Something went wrong")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <Field>
        <FieldGroup>
          <Controller
            name="name"
            control={form.control}
            render={({ field }) => (
              <InputGroup className="border-purple-600 focus-within:ring-purple-600">
                <InputGroupAddon>
                  <User className="h-4 w-4 text-purple-600" />
                </InputGroupAddon>
                <InputGroupInput
                  {...field}
                  type="text"
                  placeholder="Full name"
                  disabled={isLoading}
                  className="focus:border-purple-600"
                />
              </InputGroup>
            )}
          />
        </FieldGroup>
        {form.formState.errors.name && <FieldError>{form.formState.errors.name.message}</FieldError>}
      </Field>

      <Field>
        <FieldGroup>
          <Controller
            name="email"
            control={form.control}
            render={({ field }) => (
              <InputGroup className="border-purple-600 focus-within:ring-purple-600">
                <InputGroupAddon>
                  <Mail className="h-4 w-4 text-purple-600" />
                </InputGroupAddon>
                <InputGroupInput
                  {...field}
                  type="email"
                  placeholder="Email address"
                  disabled={isLoading}
                  className="focus:border-purple-600"
                />
              </InputGroup>
            )}
          />
        </FieldGroup>
        {form.formState.errors.email && <FieldError>{form.formState.errors.email.message}</FieldError>}
      </Field>

      <Field>
        <FieldGroup>
          <Controller
            name="password"
            control={form.control}
            render={({ field }) => (
              <InputGroup className="border-purple-600 focus-within:ring-purple-600">
                <InputGroupAddon>
                  <Lock className="h-4 w-4 text-purple-600" />
                </InputGroupAddon>
                <InputGroupInput
                  {...field}
                  type="password"
                  placeholder="Password"
                  disabled={isLoading}
                  className="focus:border-purple-600"
                />
              </InputGroup>
            )}
          />
        </FieldGroup>
        {form.formState.errors.password && <FieldError>{form.formState.errors.password.message}</FieldError>}
      </Field>

      <Field>
        <FieldGroup>
          <Controller
            name="confirmPassword"
            control={form.control}
            render={({ field }) => (
              <InputGroup className="border-purple-600 focus-within:ring-purple-600">
                <InputGroupAddon>
                  <LockKeyhole className="h-4 w-4 text-purple-600" />
                </InputGroupAddon>
                <InputGroupInput
                  {...field}
                  type="password"
                  placeholder="Confirm password"
                  disabled={isLoading}
                  className="focus:border-purple-600"
                />
              </InputGroup>
            )}
          />
        </FieldGroup>
        {form.formState.errors.confirmPassword && (
          <FieldError>{form.formState.errors.confirmPassword.message}</FieldError>
        )}
      </Field>

      <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={isLoading}>
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {isLoading ? "Creating account..." : "Sign up"}
      </Button>
    </form>
  )
}
