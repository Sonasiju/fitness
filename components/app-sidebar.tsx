"use client"

import {
  BarChart,
  Calendar,
  Calculator,
  Home,
  MessageCircle,
  BookOpen,
  LifeBuoy,
  Settings,
  Target,
  LogOut,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function AppSidebar() {
  const pathname = usePathname()

  const mainNavItems = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
    },
    {
      title: "Mood Tracking",
      url: "/mood",
      icon: BarChart,
    },
    {
      title: "Community",
      url: "/community",
      icon: MessageCircle,
    },
    {
      title: "Engagement Tools",
      url: "/tools",
      icon: Target,
    },
    {
      title: "Well-being Resources",
      url: "/resources",
      icon: BookOpen,
    },
    {
      title: "Anonymous Support",
      url: "/support",
      icon: LifeBuoy,
    },
    {
      title: "Grade Calculator",
      url: "/calculator",
      icon: Calculator,
    },
  ]

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center justify-center py-4">
        <div className="flex items-center space-x-2">
          <div className="rounded-full bg-primary p-1">
            <Calendar className="h-6 w-6 text-primary-foreground" />
          </div>
          <h1 className="text-xl font-bold">StudentWell</h1>
        </div>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url} tooltip={item.title}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/settings">
                  <Settings />
                  <span>Settings</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <div className="flex items-center w-full">
                  <Avatar className="h-6 w-6 mr-2">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" />
                    <AvatarFallback>JS</AvatarFallback>
                  </Avatar>
                  <span>John Smith</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Button variant="ghost" className="w-full justify-start" size="sm">
                <LogOut className="h-4 w-4 mr-2" />
                <span>Logout</span>
              </Button>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  )
}
