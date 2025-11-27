import z from "zod"

export const signUpSchema = z
  .object({
    name: z.string().min(5, "Name is too short").max(50, "Name is too long"),
    email: z.email("Email is invalid"),
    password: z.string().min(8, "Password is too short").max(50, "Password is too long"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

export type SignUpData = z.infer<typeof signUpSchema>
