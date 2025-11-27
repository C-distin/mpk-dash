"use client"

import { useState } from "react"
import {
  ChevronLeft,
  ChevronRight,
  BarChart3,
  Calculator,
  CreditCard,
  Package,
  Plane,
  Settings,
  Ship,
  Users,
  FileText,
  Truck,
  LucideIcon,
  ChevronsUpDown,
  LogOut,
  HelpCircle,
  User,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AvatarFallback, Avatar } from "@/components/ui/avatar"
import Link from "next/link"

interface MenuProp {
  icon: LucideIcon
  label: string
  href: string
}

interface MenuProps {
  [role: string]: MenuProp[]
}

interface UserProfileProps {
  name: string
  email: string
  initials: string
  role: string
}

const menuItems: MenuProps = {
  admin: [
    { icon: BarChart3, label: "Dashboard", href: "/dashboard" },
    { icon: Plane, label: "Air shipment", href: "/air-shipment" },
    { icon: Ship, label: "Sea shipment", href: "/sea-shipment" },
    { icon: Package, label: "Batches", href: "/batch" },
    { icon: CreditCard, label: "Payments", href: "/payment" },
    { icon: Users, label: "Clients", href: "/clients" },
    { icon: Calculator, label: "Calculator", href: "/calculator" },
    { icon: FileText, label: "Reports", href: "/reports" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ],
  user: [
    { icon: BarChart3, label: "Dashboard", href: "/dashboard" },
    { icon: Plane, label: "Air shipment", href: "/air-shipment" },
    { icon: Ship, label: "Sea shipment", href: "/sea-shipment" },
    { icon: Package, label: "Batches", href: "/batch" },
    { icon: CreditCard, label: "Payments", href: "/payment" },
    { icon: Users, label: "Clients", href: "/clients" },
    { icon: Calculator, label: "Calculator", href: "/calculator" },
  ],
}

type UserRole = keyof typeof menuItems

interface SidebarProps {
  userRole: UserRole
}

export function AppSideBar({ userRole }: SidebarProps) {
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"
  const currentMenuItems = menuItems[userRole]

  return (
    <Sidebar collapsible="icon" className="bg-linear-to-br">
      {/* logo */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard">
                <div className="flex aspect-square size-8  items-center justify-center rounded-lg">
                  <span>
                    <Truck />
                  </span>
                </div>
                <span className="text-xl font-semibold">MPK Cargo Logistics</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Menu Items */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {currentMenuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild tooltip={item.label}>
                    <a href={item.href}>
                      <item.icon />
                      <span>{item.label}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer with User Profile and Role Switcher */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                  <Avatar className="size-8">
                    <AvatarFallback className="bg-primary text-primary-foreground">JD</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">John Doe</span>
                    <span className="truncate text-xs text-muted-foreground capitalize">{userRole}</span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" side="top" align="end" sideOffset={4}>
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">John Doe</p>
                    <p className="text-xs text-muted-foreground">john.doe@example.com</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <a href="/profile">
                    <User className="mr-2 size-4" />
                    Profile
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="/settings">
                    <Settings className="mr-2 size-4" />
                    Settings
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="/help">
                    <HelpCircle className="mr-2 size-4" />
                    Help
                  </a>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-destructive focus:text-destructive"
                  onClick={() => console.log("Logging out...")}>
                  <LogOut className="mr-2 size-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
