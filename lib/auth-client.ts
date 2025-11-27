import { createAuthClient } from "better-auth/react"

const baseUrl = process.env.NEXT_PUBLIC_URL

export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: baseUrl,
})

export const { signIn, signUp, signOut, getSession, useSession } = createAuthClient()
