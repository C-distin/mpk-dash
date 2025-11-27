import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function DashboardRedirect() {
  const session = await auth.api.getSession()

  if (!session) {
    redirect("/sign-in")
  }

  if (session.user.role === "admin") {
    redirect("/admin")
  } else {
    redirect("/user")
  }
}
