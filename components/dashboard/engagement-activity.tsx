import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageCircle, BookOpen, Target, ArrowRight } from "lucide-react"

export function EngagementActivity() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Recent Activity</CardTitle>
        <Button variant="ghost" size="icon">
          <ArrowRight className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
              <MessageCircle className="h-4 w-4 text-blue-600 dark:text-blue-300" />
            </div>
            <div className="flex-1">
              <p className="font-medium">You replied to a discussion</p>
              <p className="text-sm text-muted-foreground">"Study techniques for final exams" in Community Forum</p>
              <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-full">
              <BookOpen className="h-4 w-4 text-purple-600 dark:text-purple-300" />
            </div>
            <div className="flex-1">
              <p className="font-medium">You accessed a resource</p>
              <p className="text-sm text-muted-foreground">"Stress Management During Exam Season"</p>
              <p className="text-xs text-muted-foreground mt-1">Yesterday</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full">
              <Target className="h-4 w-4 text-green-600 dark:text-green-300" />
            </div>
            <div className="flex-1">
              <p className="font-medium">You completed a challenge</p>
              <p className="text-sm text-muted-foreground">"Study for 3 consecutive days"</p>
              <p className="text-xs text-muted-foreground mt-1">2 days ago</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
