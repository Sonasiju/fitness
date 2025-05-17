"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Smile, Meh, Frown, Angry, Heart } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

// Create a context to share mood data between components
import { createContext, useContext } from "react"

type MoodEntry = {
  date: string
  mood: string
  notes: string
  icon: any
  color: string
}

type MoodContextType = {
  moodEntries: Record<string, MoodEntry>
  addMoodEntry: (entry: MoodEntry) => void
}

export const MoodContext = createContext<MoodContextType>({
  moodEntries: {},
  addMoodEntry: () => {},
})

export function useMood() {
  return useContext(MoodContext)
}

export function MoodForm() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null)
  const [notes, setNotes] = useState("")
  const { toast } = useToast()
  const { addMoodEntry } = useMood()

  const moods = [
    { name: "Happy", icon: Smile, color: "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300" },
    { name: "Neutral", icon: Meh, color: "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300" },
    { name: "Sad", icon: Frown, color: "bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300" },
    { name: "Stressed", icon: Angry, color: "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300" },
    { name: "Grateful", icon: Heart, color: "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300" },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedMood) {
      toast({
        title: "Please select a mood",
        description: "You need to select how you're feeling today",
        variant: "destructive",
      })
      return
    }

    const today = new Date().toISOString().split("T")[0]
    const selectedMoodData = moods.find((mood) => mood.name === selectedMood)

    if (selectedMoodData) {
      // Add the mood entry to the context
      addMoodEntry({
        date: today,
        mood: selectedMood,
        notes: notes,
        icon: selectedMoodData.icon,
        color: selectedMoodData.color,
      })
    }

    toast({
      title: "Mood logged successfully",
      description: `You're feeling ${selectedMood} today`,
    })

    // Reset form
    setSelectedMood(null)
    setNotes("")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>How are you feeling today?</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between mb-6">
            {moods.map((mood) => (
              <Button
                key={mood.name}
                type="button"
                variant="ghost"
                className={`flex flex-col items-center p-3 rounded-lg ${
                  selectedMood === mood.name ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => setSelectedMood(mood.name)}
              >
                <div className={`p-3 rounded-full ${mood.color}`}>
                  <mood.icon className="h-6 w-6" />
                </div>
                <span className="mt-2 text-sm">{mood.name}</span>
              </Button>
            ))}
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="notes" className="block text-sm font-medium mb-2">
                Notes (optional)
              </label>
              <Textarea
                id="notes"
                placeholder="What's on your mind today?"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
              />
            </div>

            <Button type="submit" className="w-full">
              Log Mood
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
