"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { MoodContext } from "./mood-form"
import { Smile, Meh, Frown, Angry, Heart } from "lucide-react"

type MoodEntry = {
  date: string
  mood: string
  notes: string
  icon: any
  color: string
}

export function MoodProvider({ children }: { children: React.ReactNode }) {
  const [moodEntries, setMoodEntries] = useState<Record<string, MoodEntry>>({})

  // Initialize with some sample data
  useEffect(() => {
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)
    const twoDaysAgo = new Date(today)
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2)

    const initialEntries: Record<string, MoodEntry> = {
      [yesterday.toISOString().split("T")[0]]: {
        date: yesterday.toISOString().split("T")[0],
        mood: "Happy",
        notes: "Feeling great after completing my project!",
        icon: Smile,
        color: "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300",
      },
      [twoDaysAgo.toISOString().split("T")[0]]: {
        date: twoDaysAgo.toISOString().split("T")[0],
        mood: "Neutral",
        notes: "Regular day, nothing special.",
        icon: Meh,
        color: "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300",
      },
    }

    // Add more sample entries for the past month
    for (let i = 3; i < 30; i++) {
      const pastDate = new Date(today)
      pastDate.setDate(pastDate.getDate() - i)
      const dateString = pastDate.toISOString().split("T")[0]

      // Randomly assign moods
      const moods = [
        {
          name: "Happy",
          icon: Smile,
          color: "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300",
          notes: "Had a great day!",
        },
        {
          name: "Neutral",
          icon: Meh,
          color: "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300",
          notes: "Just an ordinary day.",
        },
        {
          name: "Sad",
          icon: Frown,
          color: "bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300",
          notes: "Feeling down today.",
        },
        {
          name: "Stressed",
          icon: Angry,
          color: "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300",
          notes: "Too much work to do.",
        },
        {
          name: "Grateful",
          icon: Heart,
          color: "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300",
          notes: "Thankful for everything today.",
        },
      ]

      // Only add an entry for some days (70% chance)
      if (Math.random() < 0.7) {
        const randomMood = moods[Math.floor(Math.random() * moods.length)]
        initialEntries[dateString] = {
          date: dateString,
          mood: randomMood.name,
          notes: randomMood.notes,
          icon: randomMood.icon,
          color: randomMood.color,
        }
      }
    }

    setMoodEntries(initialEntries)
  }, [])

  const addMoodEntry = (entry: MoodEntry) => {
    setMoodEntries((prev) => ({
      ...prev,
      [entry.date]: entry,
    }))
  }

  return <MoodContext.Provider value={{ moodEntries, addMoodEntry }}>{children}</MoodContext.Provider>
}
