"use client"

import { useState } from "react"
import { ResourcesHeader } from "@/components/resources/resources-header"
import { ResourcesList } from "@/components/resources/resources-list"
import { ResourcesFilter, type ResourceFilterOptions } from "@/components/resources/resources-filter"

export default function ResourcesPage() {
  const [filters, setFilters] = useState<ResourceFilterOptions>({
    search: "",
    categories: [],
    formats: [],
  })

  const handleFilterChange = (newFilters: ResourceFilterOptions) => {
    setFilters(newFilters)
  }

  return (
    <div className="container mx-auto p-6">
      <ResourcesHeader />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
        <div className="md:col-span-1">
          <ResourcesFilter onFilterChange={handleFilterChange} />
        </div>
        <div className="md:col-span-3">
          <ResourcesList filters={filters} />
        </div>
      </div>
    </div>
  )
}
