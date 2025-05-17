import { Card, CardContent } from "@/components/ui/card"

export function MoodHeader() {
  return (
    <Card>
      <CardContent className="p-6">
        <h1 className="text-3xl font-bold">Mood Tracking</h1>
        <p className="text-muted-foreground mt-1">Track your daily emotions and discover patterns in your well-being</p>
      </CardContent>
    </Card>
  )
}
