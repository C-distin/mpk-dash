import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSideBar } from "@/components/dashboard/sidebar"
import { auth } from "@/lib/auth"

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth.api.getSession()

  const role = session?.user.name as string

  return (
    <SidebarProvider>
      <AppSideBar userRole={role} />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}
