"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"
import { useMood } from "./mood-form"

export function MoodCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const { moodEntries } = useMood()

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()

    // First day of the month
    const firstDay = new Date(year, month, 1)
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0)

    // Day of the week for the first day (0 = Sunday, 6 = Saturday)
    const startingDayOfWeek = firstDay.getDay()

    // Total days in the month
    const daysInMonth = lastDay.getDate()

    // Calendar rows (6 max)
    const rows = Math.ceil((daysInMonth + startingDayOfWeek) / 7)

    // Calendar days array
    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i)
      const dateString = date.toISOString().split("T")[0]
      days.push({
        date,
        day: i,
        mood: moodEntries[dateString] || null,
      })
    }

    return days
  }

  const days = generateCalendarDays()
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  const formatMonth = (date: Date) => {
    return date.toLocaleString("default", { month: "long", year: "numeric" })
  }

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Mood Calendar</CardTitle>
        <div className="flex items-center space-x-2">
          <button onClick={previousMonth} className="p-1 rounded-md hover:bg-muted">
            &lt;
          </button>
          <span className="font-medium">{formatMonth(currentMonth)}</span>
          <button onClick={nextMonth} className="p-1 rounded-md hover:bg-muted">
            &gt;
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-1">
          {weekdays.map((day) => (
            <div key={day} className="text-center text-xs font-medium py-1">
              {day}
            </div>
          ))}

          {days.map((day, index) => (
            <div
              key={index}
              className={`aspect-square p-1 text-center ${day ? "border rounded-md hover:bg-muted" : ""}`}
            >
              {day && (
                <>
                  <div className="text-xs mb-1">{day.day}</div>
                  {day.mood && (
                    <div className="flex justify-center">
                      <div className={`p-1 rounded-full ${day.mood.color}`}>
                        <day.mood.icon className="h-3 w-3" />
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
