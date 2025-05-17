"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useState } from "react"

export type ResourceFilterOptions = {
  search: string
  categories: string[]
  formats: string[]
}

type ResourcesFilterProps = {
  onFilterChange: (filters: ResourceFilterOptions) => void
}

export function ResourcesFilter({ onFilterChange }: ResourcesFilterProps) {
  const [search, setSearch] = useState("")
  const [categories, setCategories] = useState<string[]>([])
  const [formats, setFormats] = useState<string[]>([])

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setCategories((prev) => [...prev, category])
    } else {
      setCategories((prev) => prev.filter((c) => c !== category))
    }
  }

  const handleFormatChange = (format: string, checked: boolean) => {
    if (checked) {
      setFormats((prev) => [...prev, format])
    } else {
      setFormats((prev) => prev.filter((f) => f !== format))
    }
  }

  const applyFilters = () => {
    onFilterChange({
      search,
      categories,
      formats,
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
            placeholder="Search resources..."
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
                id="mental-health"
                checked={categories.includes("mental-health")}
                onCheckedChange={(checked) => handleCategoryChange("mental-health", checked as boolean)}
              />
              <Label htmlFor="mental-health">Mental Health</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="meditation"
                checked={categories.includes("meditation")}
                onCheckedChange={(checked) => handleCategoryChange("meditation", checked as boolean)}
              />
              <Label htmlFor="meditation">Meditation</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="physical-health"
                checked={categories.includes("physical-health")}
                onCheckedChange={(checked) => handleCategoryChange("physical-health", checked as boolean)}
              />
              <Label htmlFor="physical-health">Physical Health</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="stress-management"
                checked={categories.includes("stress-management")}
                onCheckedChange={(checked) => handleCategoryChange("stress-management", checked as boolean)}
              />
              <Label htmlFor="stress-management">Stress Management</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="sleep"
                checked={categories.includes("sleep")}
                onCheckedChange={(checked) => handleCategoryChange("sleep", checked as boolean)}
              />
              <Label htmlFor="sleep">Sleep</Label>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2">Format</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="articles"
                checked={formats.includes("article")}
                onCheckedChange={(checked) => handleFormatChange("article", checked as boolean)}
              />
              <Label htmlFor="articles">Articles</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="videos"
                checked={formats.includes("video")}
                onCheckedChange={(checked) => handleFormatChange("video", checked as boolean)}
              />
              <Label htmlFor="videos">Videos</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="podcasts"
                checked={formats.includes("podcast")}
                onCheckedChange={(checked) => handleFormatChange("podcast", checked as boolean)}
              />
              <Label htmlFor="podcasts">Podcasts</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="interactive"
                checked={formats.includes("interactive")}
                onCheckedChange={(checked) => handleFormatChange("interactive", checked as boolean)}
              />
              <Label htmlFor="interactive">Interactive</Label>
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
