"use client"

import { useState } from "react"
import { CommunityHeader } from "@/components/community/community-header"
import { CommunityPosts } from "@/components/community/community-posts"
import { CommunityFilter, type FilterOptions } from "@/components/community/community-filter"
import { CreatePostButton } from "@/components/community/create-post-button"

export default function CommunityPage() {
  const [filters, setFilters] = useState<FilterOptions>({
    search: "",
    categories: [],
    sortBy: "recent",
  })

  const [posts, setPosts] = useState<any[]>([])

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters)
  }

  const handlePostCreated = (newPost: any) => {
    setPosts((prev) => [newPost, ...prev])
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center">
        <CommunityHeader />
        <CreatePostButton onPostCreated={handlePostCreated} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
        <div className="md:col-span-1">
          <CommunityFilter onFilterChange={handleFilterChange} />
        </div>
        <div className="md:col-span-3">
          <CommunityPosts filters={filters} />
        </div>
      </div>
    </div>
  )
}
