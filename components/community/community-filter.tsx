"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useState } from "react"

export type FilterOptions = {
  search: string
  categories: string[]
  sortBy: string
}

type CommunityFilterProps = {
  onFilterChange: (filters: FilterOptions) => void
}

export function CommunityFilter({ onFilterChange }: CommunityFilterProps) {
  const [search, setSearch] = useState("")
  const [categories, setCategories] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("recent")

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setCategories((prev) => [...prev, category])
    } else {
      setCategories((prev) => prev.filter((c) => c !== category))
    }
  }

  const handleSortChange = (sort: string, checked: boolean) => {
    if (checked) {
      setSortBy(sort)
    }
  }

  const applyFilters = () => {
    onFilterChange({
      search,
      categories,
      sortBy,
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search discussions..."
            className="pl-8"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2">Categories</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="academic"
                checked={categories.includes("academic")}
                onCheckedChange={(checked) => handleCategoryChange("academic", checked as boolean)}
              />
              <Label htmlFor="academic">Academic</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="wellbeing"
                checked={categories.includes("wellbeing")}
                onCheckedChange={(checked) => handleCategoryChange("wellbeing", checked as boolean)}
              />
              <Label htmlFor="wellbeing">Well-being</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="social"
                checked={categories.includes("social")}
                onCheckedChange={(checked) => handleCategoryChange("social", checked as boolean)}
              />
              <Label htmlFor="social">Social</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="career"
                checked={categories.includes("career")}
                onCheckedChange={(checked) => handleCategoryChange("career", checked as boolean)}
              />
              <Label htmlFor="career">Career</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="general"
                checked={categories.includes("general")}
                onCheckedChange={(checked) => handleCategoryChange("general", checked as boolean)}
              />
              <Label htmlFor="general">General</Label>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2">Sort By</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="recent"
                checked={sortBy === "recent"}
                onCheckedChange={(checked) => handleSortChange("recent", checked as boolean)}
              />
              <Label htmlFor="recent">Most Recent</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="popular"
                checked={sortBy === "popular"}
                onCheckedChange={(checked) => handleSortChange("popular", checked as boolean)}
              />
              <Label htmlFor="popular">Most Popular</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="active"
                checked={sortBy === "active"}
                onCheckedChange={(checked) => handleSortChange("active", checked as boolean)}
              />
              <Label htmlFor="active">Most Active</Label>
            </div>
          </div>
        </div>

        <Button className="w-full" variant="outline" onClick={applyFilters}>
          Apply Filters
        </Button>
      </CardContent>
    </Card>
  )
}
