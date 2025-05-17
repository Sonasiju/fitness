import { NextResponse } from "next/server"

// Mock community posts API
export async function GET(request: Request) {
  // In a real application, you would fetch posts from a database
  const mockPosts = [
    {
      id: 1,
      author: {
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "SJ",
      },
      category: "Academic",
      title: "Study techniques for final exams",
      content:
        "I'm struggling with preparing for my final exams. What study techniques do you find most effective for retaining information? I've tried flashcards but I'm not seeing results.",
      comments: 12,
      likes: 24,
      time: "2 hours ago",
    },
    {
      id: 2,
      author: {
        name: "Michael Chen",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "MC",
      },
      category: "Well-being",
      title: "Managing stress during exam season",
      content:
        "Exam season is hitting me hard this year. I'm feeling overwhelmed and struggling to maintain a healthy balance. What are your go-to stress management techniques?",
      comments: 8,
      likes: 19,
      time: "5 hours ago",
    },
    {
      id: 3,
      author: {
        name: "Emily Rodriguez",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "ER",
      },
      category: "Social",
      title: "Making friends as an international student",
      content:
        "I just moved here from abroad and I'm finding it challenging to make friends. Any advice for international students trying to build a social circle?",
      comments: 15,
      likes: 32,
      time: "Yesterday",
    },
  ]

  return NextResponse.json({ success: true, data: mockPosts })
}

export async function POST(request: Request) {
  try {
    const { title, content, category } = await request.json()

    // In a real application, you would save this to a database
    if (title && content && category) {
      return NextResponse.json({
        success: true,
        data: {
          id: Math.floor(Math.random() * 1000),
          title,
          content,
          category,
          author: {
            name: "John Smith",
            avatar: "/placeholder.svg?height=40&width=40",
            initials: "JS",
          },
          comments: 0,
          likes: 0,
          time: "Just now",
        },
      })
    } else {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to create post" }, { status: 500 })
  }
}
