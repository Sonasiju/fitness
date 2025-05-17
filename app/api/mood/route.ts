import { NextResponse } from "next/server"

// Mock mood tracking API
export async function GET(request: Request) {
  // In a real application, you would fetch mood data from a database
  const mockMoodData = [
    { date: "2025-03-01", mood: "Happy", notes: "Feeling great today!" },
    { date: "2025-03-02", mood: "Happy", notes: "Had a productive day" },
    { date: "2025-03-03", mood: "Neutral", notes: "Regular day" },
    { date: "2025-03-04", mood: "Stressed", notes: "Exam preparation" },
    { date: "2025-03-05", mood: "Neutral", notes: "" },
    { date: "2025-03-10", mood: "Sad", notes: "Missing home" },
    { date: "2025-03-15", mood: "Stressed", notes: "Assignment deadline" },
    { date: "2025-03-19", mood: "Grateful", notes: "Finished all assignments" },
  ]

  return NextResponse.json({ success: true, data: mockMoodData })
}

export async function POST(request: Request) {
  try {
    const { mood, notes, date } = await request.json()

    // In a real application, you would save this to a database
    if (mood) {
      return NextResponse.json({
        success: true,
        data: { mood, notes, date: date || new Date().toISOString() },
      })
    } else {
      return NextResponse.json({ success: false, error: "Mood is required" }, { status: 400 })
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to save mood data" }, { status: 500 })
  }
}
