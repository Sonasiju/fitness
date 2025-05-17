"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, LineChart } from "lucide-react"
import { useMood } from "./mood-form"
import { useEffect, useState } from "react"

export function MoodInsights() {
  const { moodEntries } = useMood()
  const [moodDistribution, setMoodDistribution] = useState({
    Happy: 0,
    Neutral: 0,
    Sad: 0,
    Stressed: 0,
    Grateful: 0,
  })

  const [totalEntries, setTotalEntries] = useState(0)

  useEffect(() => {
    // Calculate mood distribution
    const distribution = {
      Happy: 0,
      Neutral: 0,
      Sad: 0,
      Stressed: 0,
      Grateful: 0,
    }

    Object.values(moodEntries).forEach((entry) => {
      if (distribution.hasOwnProperty(entry.mood)) {
        distribution[entry.mood as keyof typeof distribution]++
      }
    })

    setMoodDistribution(distribution)
    setTotalEntries(Object.values(moodEntries).length)
  }, [moodEntries])

  const calculatePercentage = (count: number) => {
    if (totalEntries === 0) return 0
    return Math.round((count / totalEntries) * 100)
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Mood Insights</CardTitle>
        <div className="flex space-x-2">
          <button className="p-1 rounded-md hover:bg-muted">
            <BarChart className="h-4 w-4" />
          </button>
          <button className="p-1 rounded-md hover:bg-muted">
            <LineChart className="h-4 w-4" />
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Mood Distribution</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <span className="text-xs w-16">Happy</span>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500 rounded-full"
                    style={{ width: `${calculatePercentage(moodDistribution.Happy)}%` }}
                  ></div>
                </div>
                <span className="text-xs ml-2">{calculatePercentage(moodDistribution.Happy)}%</span>
              </div>
              <div className="flex items-center">
                <span className="text-xs w-16">Neutral</span>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full"
                    style={{ width: `${calculatePercentage(moodDistribution.Neutral)}%` }}
                  ></div>
                </div>
                <span className="text-xs ml-2">{calculatePercentage(moodDistribution.Neutral)}%</span>
              </div>
              <div className="flex items-center">
                <span className="text-xs w-16">Sad</span>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-500 rounded-full"
                    style={{ width: `${calculatePercentage(moodDistribution.Sad)}%` }}
                  ></div>
                </div>
                <span className="text-xs ml-2">{calculatePercentage(moodDistribution.Sad)}%</span>
              </div>
              <div className="flex items-center">
                <span className="text-xs w-16">Stressed</span>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-red-500 rounded-full"
                    style={{ width: `${calculatePercentage(moodDistribution.Stressed)}%` }}
                  ></div>
                </div>
                <span className="text-xs ml-2">{calculatePercentage(moodDistribution.Stressed)}%</span>
              </div>
              <div className="flex items-center">
                <span className="text-xs w-16">Grateful</span>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-purple-500 rounded-full"
                    style={{ width: `${calculatePercentage(moodDistribution.Grateful)}%` }}
                  ></div>
                </div>
                <span className="text-xs ml-2">{calculatePercentage(moodDistribution.Grateful)}%</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Patterns & Insights</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start space-x-2">
                <div className="h-2 w-2 rounded-full bg-green-500 mt-1.5"></div>
                <span>You tend to feel happier on weekends</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="h-2 w-2 rounded-full bg-red-500 mt-1.5"></div>
                <span>Stress levels increase before exams</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="h-2 w-2 rounded-full bg-blue-500 mt-1.5"></div>
                <span>Your mood improves after physical activity</span>
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
