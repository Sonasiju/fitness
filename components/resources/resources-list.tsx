"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Video, Headphones, Clock, ExternalLink } from "lucide-react"
import type { ResourceFilterOptions } from "./resources-filter"

type Resource = {
  id: number
  title: string
  description: string
  category: string
  format: string
  icon: any
  duration: string
  link: string
}

type ResourcesListProps = {
  filters: ResourceFilterOptions
}

export function ResourcesList({ filters }: ResourcesListProps) {
  const [allResources, setAllResources] = useState<Resource[]>([
    {
      id: 1,
      title: "Managing Exam Stress: A Student's Guide",
      description:
        "Learn effective techniques to manage stress during exam periods, including breathing exercises, time management, and positive self-talk.",
      category: "Stress Management",
      format: "Article",
      icon: BookOpen,
      duration: "10 min read",
      link: "#",
    },
    {
      id: 2,
      title: "5-Minute Guided Meditation for Focus",
      description:
        "A short guided meditation designed to help students improve focus and concentration before studying or exams.",
      category: "Meditation",
      format: "Video",
      icon: Video,
      duration: "5 min watch",
      link: "#",
    },
    {
      id: 3,
      title: "Sleep Hygiene for Better Academic Performance",
      description:
        "Discover how improving your sleep habits can lead to better academic performance, memory retention, and overall well-being.",
      category: "Sleep",
      format: "Article",
      icon: BookOpen,
      duration: "8 min read",
      link: "#",
    },
    {
      id: 4,
      title: "Student Mental Health Podcast",
      description:
        "A podcast discussing common mental health challenges faced by students and strategies for maintaining good mental health during academic life.",
      category: "Mental Health",
      format: "Podcast",
      icon: Headphones,
      duration: "25 min listen",
      link: "#",
    },
    {
      id: 5,
      title: "Quick Exercise Routines for Busy Students",
      description:
        "Simple exercise routines that can be done in your dorm room or small space, designed to boost energy and reduce stress.",
      category: "Physical Health",
      format: "Video",
      icon: Video,
      duration: "15 min watch",
      link: "#",
    },
    {
      id: 6,
      title: "Mindfulness Techniques for Exam Anxiety",
      description: "Learn mindfulness practices specifically designed to help manage anxiety before and during exams.",
      category: "Mental Health",
      format: "Article",
      icon: BookOpen,
      duration: "12 min read",
      link: "#",
    },
    {
      id: 7,
      title: "Healthy Eating on a Student Budget",
      description: "Practical tips for maintaining a nutritious diet while managing a tight student budget.",
      category: "Physical Health",
      format: "Article",
      icon: BookOpen,
      duration: "15 min read",
      link: "#",
    },
    {
      id: 8,
      title: "Deep Sleep Meditation for Students",
      description:
        "A guided meditation designed to help students fall asleep faster and achieve deeper, more restorative sleep.",
      category: "Sleep",
      format: "Audio",
      icon: Headphones,
      duration: "20 min listen",
      link: "#",
    },
  ])

  const [displayedResources, setDisplayedResources] = useState<Resource[]>([])
  const [visibleResources, setVisibleResources] = useState(5)

  // Apply filters when they change
  useEffect(() => {
    let filtered = [...allResources]

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filtered = filtered.filter(
        (resource) =>
          resource.title.toLowerCase().includes(searchLower) ||
          resource.description.toLowerCase().includes(searchLower),
      )
    }

    // Apply category filter
    if (filters.categories.length > 0) {
      filtered = filtered.filter((resource) =>
        filters.categories.some((category) => resource.category.toLowerCase().replace(/\s+/g, "-") === category),
      )
    }

    // Apply format filter
    if (filters.formats.length > 0) {
      filtered = filtered.filter((resource) => filters.formats.includes(resource.format.toLowerCase()))
    }

    setDisplayedResources(filtered)
  }, [filters, allResources])

  const getFormatIcon = (format: string) => {
    switch (format) {
      case "Article":
        return <BookOpen className="h-4 w-4" />
      case "Video":
        return <Video className="h-4 w-4" />
      case "Podcast":
      case "Audio":
        return <Headphones className="h-4 w-4" />
      default:
        return <BookOpen className="h-4 w-4" />
    }
  }

  const loadMore = () => {
    setVisibleResources((prev) => prev + 5)
  }

  return (
    <div className="space-y-4">
      {displayedResources.slice(0, visibleResources).map((resource) => (
        <Card key={resource.id}>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-semibold">{resource.title}</h3>
              <Badge variant="outline">{resource.category}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{resource.description}</p>
            <div className="flex items-center space-x-4 mt-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                {getFormatIcon(resource.format)}
                <span className="ml-1">{resource.format}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {resource.duration}
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t pt-4">
            <Button variant="outline" className="w-full" asChild>
              <a href={resource.link} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                View Resource
              </a>
            </Button>
          </CardFooter>
        </Card>
      ))}

      {displayedResources.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No resources match your filters</p>
        </div>
      )}

      {visibleResources < displayedResources.length && (
        <Button variant="outline" className="w-full" onClick={loadMore}>
          Load More
        </Button>
      )}
    </div>
  )
}
