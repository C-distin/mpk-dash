import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function Page() {
  const session = await auth.api.getSession()

  if (!session || session.user.role !== "user") {
    redirect("/sign-in")
  }

  return (
    <section className="p-12 text-center">
      <h1 className="text-4xl font-bold">User Page</h1>
      <p className="text-lg">Welcome, {session.user.name}</p>
    </section>
  )
}
