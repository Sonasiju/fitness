"use client"

import { MoodHeader } from "@/components/mood/mood-header"
import { MoodCalendar } from "@/components/mood/mood-calendar"
import { MoodForm } from "@/components/mood/mood-form"
import { MoodInsights } from "@/components/mood/mood-insights"
import { MoodProvider } from "@/components/mood/mood-provider"

export default function MoodPage() {
  return (
    <MoodProvider>
      <div className="container mx-auto p-6">
        <MoodHeader />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="space-y-6">
            <MoodForm />
            <MoodInsights />
          </div>
          <div>
            <MoodCalendar />
          </div>
        </div>
      </div>
    </MoodProvider>
  )
}
