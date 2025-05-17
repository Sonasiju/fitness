"use client"

import type React from "react"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Shield, Send } from "lucide-react"

export function AnonymousForm() {
  const [concern, setConcern] = useState("")\
  const [category, setCategory] = useState  {
  const [concern, setConcern] = useState("")
  const [category, setCategory] = useState("")
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!concern || !category) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }

    // Here you would normally send the support request
    toast({
      title: "Request submitted",
      description: "Your anonymous support request has been sent",
    })

    // Reset form
    setConcern("")
    setCategory("")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Shield className="h-5 w-5 mr-2 text-primary" />
          Anonymous Support Request
        </CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="bg-muted/50 p-3 rounded-md text-sm">
            <p>
              <strong>Your privacy is protected.</strong> All submissions are completely anonymous. No identifying
              information is collected or stored.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Type of Concern</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="academic">Academic Stress</SelectItem>
                <SelectItem value="mental-health">Mental Health</SelectItem>
                <SelectItem value="social">Social Issues</SelectItem>
                <SelectItem value="financial">Financial Concerns</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="concern">Describe your concern</Label>
            <Textarea
              id="concern"
              placeholder="Share what's on your mind..."
              rows={6}
              value={concern}
              onChange={(e) => setConcern(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            <Send className="h-4 w-4 mr-2" />
            Submit Anonymously
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
