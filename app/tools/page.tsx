import { ToolsHeader } from "@/components/tools/tools-header"
import { StudyScheduler } from "@/components/tools/study-scheduler"
import { ProductivityTracker } from "@/components/tools/productivity-tracker"
import { ChallengesList } from "@/components/tools/challenges-list"

export default function ToolsPage() {
  return (
    <div className="container mx-auto p-6">
      <ToolsHeader />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="space-y-6">
          <StudyScheduler />
          <ProductivityTracker />
        </div>
        <div>
          <ChallengesList />
        </div>
      </div>
    </div>
  )
}
