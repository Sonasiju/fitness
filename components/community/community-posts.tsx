"use client"

import { Input } from "@/components/ui/input"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { MessageSquare, Heart, Share2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useState, useEffect } from "react"
import type { FilterOptions } from "./community-filter"
import { useToast } from "@/components/ui/use-toast"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

type Post = {
  id: number
  author: {
    name: string
    avatar: string
    initials: string
  }
  category: string
  title: string
  content: string
  comments: number
  likes: number
  time: string
  isLiked?: boolean
  commentsList?: Comment[]
}

type Comment = {
  id: number
  author: {
    name: string
    avatar: string
    initials: string
  }
  content: string
  time: string
}

type CommunityPostsProps = {
  filters: FilterOptions
}

export function CommunityPosts({ filters }: CommunityPostsProps) {
  const [allPosts, setAllPosts] = useState<Post[]>([
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
      isLiked: false,
      commentsList: [
        {
          id: 1,
          author: {
            name: "Alex Thompson",
            avatar: "/placeholder.svg?height=40&width=40",
            initials: "AT",
          },
          content:
            "I find the Pomodoro technique really helpful - 25 minutes of focused study followed by a 5-minute break.",
          time: "1 hour ago",
        },
        {
          id: 2,
          author: {
            name: "Jamie Lee",
            avatar: "/placeholder.svg?height=40&width=40",
            initials: "JL",
          },
          content:
            "Active recall has been a game-changer for me. Instead of just reading, try to recall the information without looking at your notes.",
          time: "45 minutes ago",
        },
      ],
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
      isLiked: false,
      commentsList: [
        {
          id: 1,
          author: {
            name: "Taylor Swift",
            avatar: "/placeholder.svg?height=40&width=40",
            initials: "TS",
          },
          content:
            "I make sure to take at least 30 minutes each day to do something completely unrelated to studying - like going for a walk or listening to music.",
          time: "3 hours ago",
        },
      ],
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
      isLiked: false,
      commentsList: [
        {
          id: 1,
          author: {
            name: "Jordan Park",
            avatar: "/placeholder.svg?height=40&width=40",
            initials: "JP",
          },
          content: "Join clubs related to your interests! It's the easiest way to meet people who share your passions.",
          time: "20 hours ago",
        },
        {
          id: 2,
          author: {
            name: "Sam Wilson",
            avatar: "/placeholder.svg?height=40&width=40",
            initials: "SW",
          },
          content:
            "The international student association hosts weekly meetups. I met most of my friends there when I first arrived.",
          time: "18 hours ago",
        },
      ],
    },
  ])

  const [displayedPosts, setDisplayedPosts] = useState<Post[]>([])
  const [visiblePosts, setVisiblePosts] = useState(3)
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [commentText, setCommentText] = useState("")
  const [isCommenting, setIsCommenting] = useState(false)
  const [isSharing, setIsSharing] = useState(false)
  const { toast } = useToast()

  // Apply filters when they change
  useEffect(() => {
    let filtered = [...allPosts]

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filtered = filtered.filter(
        (post) => post.title.toLowerCase().includes(searchLower) || post.content.toLowerCase().includes(searchLower),
      )
    }

    // Apply category filter
    if (filters.categories.length > 0) {
      filtered = filtered.filter((post) => filters.categories.includes(post.category.toLowerCase()))
    }

    // Apply sort
    if (filters.sortBy === "recent") {
      // Already sorted by recent
    } else if (filters.sortBy === "popular") {
      filtered.sort((a, b) => b.likes - a.likes)
    } else if (filters.sortBy === "active") {
      filtered.sort((a, b) => b.comments - a.comments)
    }

    setDisplayedPosts(filtered)
  }, [filters, allPosts])

  const handleLike = (postId: number) => {
    setAllPosts((posts) =>
      posts.map((post) => {
        if (post.id === postId) {
          const isLiked = post.isLiked || false
          return {
            ...post,
            likes: isLiked ? post.likes - 1 : post.likes + 1,
            isLiked: !isLiked,
          }
        }
        return post
      }),
    )
  }

  const handleShare = (post: Post) => {
    setSelectedPost(post)
    setIsSharing(true)

    // In a real app, you would implement actual sharing functionality
    setTimeout(() => {
      setIsSharing(false)
      toast({
        title: "Post shared",
        description: "The post has been copied to your clipboard",
      })
    }, 1000)
  }

  const handleComment = (post: Post) => {
    setSelectedPost(post)
    setIsCommenting(true)
  }

  const submitComment = () => {
    if (!commentText.trim() || !selectedPost) return

    const newComment = {
      id: Date.now(),
      author: {
        name: "John Smith",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "JS",
      },
      content: commentText,
      time: "Just now",
    }

    setAllPosts((posts) =>
      posts.map((post) => {
        if (post.id === selectedPost.id) {
          const commentsList = post.commentsList || []
          return {
            ...post,
            comments: post.comments + 1,
            commentsList: [newComment, ...commentsList],
          }
        }
        return post
      }),
    )

    setCommentText("")
    setIsCommenting(false)

    toast({
      title: "Comment added",
      description: "Your comment has been added to the post",
    })
  }

  const loadMore = () => {
    setVisiblePosts((prev) => prev + 3)
  }

  return (
    <div className="space-y-4">
      {displayedPosts.slice(0, visiblePosts).map((post) => (
        <Card key={post.id}>
          <CardHeader className="pb-4">
            <div className="flex justify-between items-start">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                  <AvatarFallback>{post.author.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{post.author.name}</p>
                  <p className="text-xs text-muted-foreground">{post.time}</p>
                </div>
              </div>
              <Badge variant="outline">{post.category}</Badge>
            </div>
            <h3 className="text-lg font-semibold mt-2">{post.title}</h3>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{post.content}</p>
          </CardContent>
          <CardFooter className="border-t pt-4 flex justify-between">
            <div className="flex space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-1"
                onClick={() => handleComment(post)}
              >
                <MessageSquare className="h-4 w-4" />
                <span>{post.comments}</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={`flex items-center space-x-1 ${post.isLiked ? "text-red-500" : ""}`}
                onClick={() => handleLike(post.id)}
              >
                <Heart className={`h-4 w-4 ${post.isLiked ? "fill-current" : ""}`} />
                <span>{post.likes}</span>
              </Button>
            </div>
            <Button variant="ghost" size="sm" className="flex items-center space-x-1" onClick={() => handleShare(post)}>
              <Share2 className="h-4 w-4" />
              <span>Share</span>
            </Button>
          </CardFooter>
        </Card>
      ))}

      {visiblePosts < displayedPosts.length && (
        <Button variant="outline" className="w-full" onClick={loadMore}>
          Load More
        </Button>
      )}

      {displayedPosts.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No posts match your filters</p>
        </div>
      )}

      {/* Comment Dialog */}
      <Dialog open={isCommenting} onOpenChange={setIsCommenting}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add a comment</DialogTitle>
            <DialogDescription>Share your thoughts on this post</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Textarea
              placeholder="Write your comment here..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              rows={4}
            />

            {selectedPost?.commentsList && selectedPost.commentsList.length > 0 && (
              <div className="space-y-4 mt-4">
                <h4 className="text-sm font-medium">Previous Comments</h4>
                {selectedPost.commentsList.map((comment) => (
                  <div key={comment.id} className="border-t pt-4">
                    <div className="flex items-start space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={comment.author.avatar || "/placeholder.svg"} alt={comment.author.name} />
                        <AvatarFallback>{comment.author.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center">
                          <p className="text-sm font-medium">{comment.author.name}</p>
                          <p className="text-xs text-muted-foreground ml-2">{comment.time}</p>
                        </div>
                        <p className="text-sm mt-1">{comment.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsCommenting(false)}>
              Cancel
            </Button>
            <Button onClick={submitComment} disabled={!commentText.trim()}>
              Post Comment
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Share Dialog */}
      <Dialog open={isSharing} onOpenChange={setIsSharing}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Share Post</DialogTitle>
            <DialogDescription>Share this post with others</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex justify-around">
              <Button variant="outline" size="icon" className="rounded-full h-10 w-10">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                </svg>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full h-10 w-10">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                </svg>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full h-10 w-10">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                </svg>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full h-10 w-10">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
                </svg>
              </Button>
            </div>
            <div className="relative">
              <Input value={`https://studentwell.com/community/post/${selectedPost?.id}`} readOnly />
              <Button
                className="absolute right-0 top-0 h-full rounded-l-none"
                onClick={() => {
                  navigator.clipboard.writeText(`https://studentwell.com/community/post/${selectedPost?.id}`)
                  toast({
                    title: "Link copied",
                    description: "The post link has been copied to your clipboard",
                  })
                }}
              >
                Copy
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
