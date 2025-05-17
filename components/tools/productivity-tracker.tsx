"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { Play, Pause, RotateCcw, CheckCircle2 } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export function ProductivityTracker() {
  const [isActive, setIsActive] = useState(false)
  const [isPaused, setIsPaused] = useState(true)
  const [time, setTime] = useState(0)
  const [sessions, setSessions] = useState(0)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isActive && !isPaused) {
      interval = setInterval(() => {
        setTime((time) => time + 1)
      }, 1000)
    } else {
      interval && clearInterval(interval)
    }
    return () => {
      interval && clearInterval(interval)
    }
  }, [isActive, isPaused])

  const handleStart = () => {
    setIsActive(true)
    setIsPaused(false)
  }

  const handlePause = () => {
    setIsPaused(true)
  }

  const handleResume = () => {
    setIsPaused(false)
  }

  const handleReset = () => {
    setIsActive(false)
    setTime(0)
  }

  const handleComplete = () => {
    setSessions(sessions + 1)
    setIsActive(false)
    setTime(0)
  }

  // Format time as mm:ss
  const formatTime = () => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }

  // Calculate progress percentage (assuming 25-minute pomodoro)
  const progressPercentage = Math.min((time / (25 * 60)) * 100, 100)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Productivity Timer</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className="text-6xl font-mono font-bold mb-2">{formatTime()}</div>
          <Progress value={progressPercentage} className="h-2" />
          <p className="text-sm text-muted-foreground mt-2">{sessions} sessions completed today</p>
        </div>

        <div className="flex justify-center space-x-2">
          {!isActive && (
            <Button onClick={handleStart} className="w-full">
              <Play className="h-4 w-4 mr-2" />
              Start
            </Button>
          )}
          {isActive && isPaused && (
            <Button onClick={handleResume} className="w-full">
              <Play className="h-4 w-4 mr-2" />
              Resume
            </Button>
          )}
          {isActive && !isPaused && (
            <Button onClick={handlePause} className="w-full">
              <Pause className="h-4 w-4 mr-2" />
              Pause
            </Button>
          )}
          {isActive && (
            <Button onClick={handleReset} variant="outline">
              <RotateCcw className="h-4 w-4" />
            </Button>
          )}
          {isActive && (
            <Button onClick={handleComplete} variant="outline">
              <CheckCircle2 className="h-4 w-4" />
            </Button>
          )}
        </div>

        <div className="bg-muted/50 p-3 rounded-md text-sm">
          <p className="font-medium mb-1">Pomodoro Technique</p>
          <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
            <li>Work for 25 minutes</li>
            <li>Take a 5-minute break</li>
            <li>After 4 sessions, take a longer 15-30 minute break</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  )
}
