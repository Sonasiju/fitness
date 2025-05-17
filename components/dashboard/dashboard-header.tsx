"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Bell } from "lucide-react"
import { useState } from "react"

export function DashboardHeader() {
  const [greeting, setGreeting] = useState(() => {
    const hour = new Date().getHours()
    if (hour < 12) return "Good morning"
    if (hour < 18) return "Good afternoon"
    return "Good evening"
  })

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">{greeting}, John</h1>
            <p className="text-muted-foreground mt-1">Here's an overview of your well-being and engagement</p>
          </div>
          <Button variant="outline" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
