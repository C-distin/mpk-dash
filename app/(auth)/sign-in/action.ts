"use server"

import { auth } from "@/lib/auth"

export async function signIn(email: string, password: string) {
  try {
    await auth.api.signInEmail({
      body: {
        email: email,
        password: password,
      },
    })
    return {
      success: true,
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Something went wrong",
    }
  }
}
