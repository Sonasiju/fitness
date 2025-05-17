"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Smile, Meh, Frown, Plus } from "lucide-react"
import Link from "next/link"

export function MoodTracker() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Mood Tracker</CardTitle>
        <Button variant="outline" size="sm" asChild>
          <Link href="/mood">
            <Plus className="h-4 w-4 mr-2" />
            Log Mood
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full">
                <Smile className="h-5 w-5 text-green-600 dark:text-green-300" />
              </div>
              <div>
                <p className="font-medium">Happy</p>
                <p className="text-xs text-muted-foreground">Yesterday</p>
              </div>
            </div>
            <p className="text-sm">"Feeling great after completing my project!"</p>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="bg-yellow-100 dark:bg-yellow-900 p-2 rounded-full">
                <Meh className="h-5 w-5 text-yellow-600 dark:text-yellow-300" />
              </div>
              <div>
                <p className="font-medium">Neutral</p>
                <p className="text-xs text-muted-foreground">2 days ago</p>
              </div>
            </div>
            <p className="text-sm">"Regular day, nothing special."</p>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="bg-red-100 dark:bg-red-900 p-2 rounded-full">
                <Frown className="h-5 w-5 text-red-600 dark:text-red-300" />
              </div>
              <div>
                <p className="font-medium">Stressed</p>
                <p className="text-xs text-muted-foreground">3 days ago</p>
              </div>
            </div>
            <p className="text-sm">"Exam preparation is stressful."</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
