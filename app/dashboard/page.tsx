import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import { MoodTracker } from "@/components/dashboard/mood-tracker"
import { UpcomingReminders } from "@/components/dashboard/upcoming-reminders"
import { WellbeingTips } from "@/components/dashboard/wellbeing-tips"
import { EngagementActivity } from "@/components/dashboard/engagement-activity"

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-6">
      <DashboardHeader />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="md:col-span-2 space-y-6">
          <DashboardStats />
          <MoodTracker />
          <EngagementActivity />
        </div>
        <div className="space-y-6">
          <UpcomingReminders />
          <WellbeingTips />
        </div>
      </div>
    </div>
  )
}
