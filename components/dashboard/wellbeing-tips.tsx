import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, ArrowRight } from "lucide-react"
import Link from "next/link"

export function WellbeingTips() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Wellbeing Tips</CardTitle>
        <Button variant="ghost" size="icon" asChild>
          <Link href="/resources">
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="bg-primary/10 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Heart className="h-5 w-5 text-primary" />
              <h3 className="font-medium">Mindful Breathing</h3>
            </div>
            <p className="text-sm">
              Take 5 minutes to practice deep breathing. Inhale for 4 counts, hold for 4, exhale for 6.
            </p>
          </div>

          <div className="bg-primary/10 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Heart className="h-5 w-5 text-primary" />
              <h3 className="font-medium">Study Break</h3>
            </div>
            <p className="text-sm">Remember to take a 5-minute break for every 25 minutes of focused study time.</p>
          </div>

          <Button variant="outline" className="w-full" size="sm" asChild>
            <Link href="/resources">More Wellbeing Resources</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
