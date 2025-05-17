// This is a mock database service
// In a real application, you would use a real database like Supabase, PostgreSQL, etc.

// Mock user data
const users = [
  {
    id: "user_123",
    name: "John Smith",
    email: "john@example.com",
    password: "password123", // In a real app, this would be hashed
    role: "student",
  },
]

// Mock mood data
const moodEntries = [
  { id: 1, userId: "user_123", date: "2025-03-01", mood: "Happy", notes: "Feeling great today!" },
  { id: 2, userId: "user_123", date: "2025-03-02", mood: "Happy", notes: "Had a productive day" },
  { id: 3, userId: "user_123", date: "2025-03-03", mood: "Neutral", notes: "Regular day" },
  { id: 4, userId: "user_123", date: "2025-03-04", mood: "Stressed", notes: "Exam preparation" },
  { id: 5, userId: "user_123", date: "2025-03-05", mood: "Neutral", notes: "" },
  { id: 6, userId: "user_123", date: "2025-03-10", mood: "Sad", notes: "Missing home" },
  { id: 7, userId: "user_123", date: "2025-03-15", mood: "Stressed", notes: "Assignment deadline" },
  { id: 8, userId: "user_123", date: "2025-03-19", mood: "Grateful", notes: "Finished all assignments" },
]

// Mock community posts
const posts = [
  {
    id: 1,
    userId: "user_123",
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
    createdAt: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
  },
  {
    id: 2,
    userId: "user_456",
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
    createdAt: new Date(Date.now() - 18000000).toISOString(), // 5 hours ago
  },
  {
    id: 3,
    userId: "user_789",
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
    createdAt: new Date(Date.now() - 86400000).toISOString(), // Yesterday
  },
]

// Mock database service
export const db = {
  // User methods
  getUser: async (id: string) => {
    return users.find((user) => user.id === id) || null
  },

  getUserByEmail: async (email: string) => {
    return users.find((user) => user.email === email) || null
  },

  createUser: async (userData: any) => {
    const newUser = {
      id: `user_${users.length + 1}`,
      ...userData,
    }
    users.push(newUser)
    return newUser
  },

  // Mood methods
  getMoodEntries: async (userId: string) => {
    return moodEntries.filter((entry) => entry.userId === userId)
  },

  createMoodEntry: async (entryData: any) => {
    const newEntry = {
      id: moodEntries.length + 1,
      ...entryData,
    }
    moodEntries.push(newEntry)
    return newEntry
  },

  // Community post methods
  getPosts: async () => {
    return posts
  },

  getPostById: async (id: number) => {
    return posts.find((post) => post.id === id) || null
  },

  createPost: async (postData: any) => {
    const newPost = {
      id: posts.length + 1,
      createdAt: new Date().toISOString(),
      comments: 0,
      likes: 0,
      ...postData,
    }
    posts.push(newPost)
    return newPost
  },
}
