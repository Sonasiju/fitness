"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Calendar, Clock, Plus, Trash2 } from "lucide-react"

export function StudyScheduler() {
  const [sessions, setSessions] = useState([
    { id: 1, subject: "Mathematics", day: "monday", startTime: "09:00", duration: "60" },
    { id: 2, subject: "Physics", day: "wednesday", startTime: "14:00", duration: "90" },
  ])
  const [newSession, setNewSession] = useState({
    subject: "",
    day: "",
    startTime: "",
    duration: "60",
  })
  const { toast } = useToast()

  const handleAddSession = () => {
    if (!newSession.subject || !newSession.day || !newSession.startTime) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }

    const id = sessions.length ? Math.max(...sessions.map((s) => s.id)) + 1 : 1
    setSessions([...sessions, { id, ...newSession }])

    // Reset form
    setNewSession({
      subject: "",
      day: "",
      startTime: "",
      duration: "60",
    })

    toast({
      title: "Study session added",
      description: `${newSession.subject} added to your schedule`,
    })
  }

  const handleRemoveSession = (id: number) => {
    setSessions(sessions.filter((session) => session.id !== id))
    toast({
      title: "Study session removed",
      description: "The session has been removed from your schedule",
    })
  }

  const formatDay = (day: string) => {
    return day.charAt(0).toUpperCase() + day.slice(1)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Study Schedule</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              placeholder="e.g. Mathematics"
              value={newSession.subject}
              onChange={(e) => setNewSession({ ...newSession, subject: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="day">Day</Label>
            <Select value={newSession.day} onValueChange={(value) => setNewSession({ ...newSession, day: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select day" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monday">Monday</SelectItem>
                <SelectItem value="tuesday">Tuesday</SelectItem>
                <SelectItem value="wednesday">Wednesday</SelectItem>
                <SelectItem value="thursday">Thursday</SelectItem>
                <SelectItem value="friday">Friday</SelectItem>
                <SelectItem value="saturday">Saturday</SelectItem>
                <SelectItem value="sunday">Sunday</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="startTime">Start Time</Label>
            <Input
              id="startTime"
              type="time"
              value={newSession.startTime}
              onChange={(e) => setNewSession({ ...newSession, startTime: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="duration">Duration (minutes)</Label>
            <Select
              value={newSession.duration}
              onValueChange={(value) => setNewSession({ ...newSession, duration: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30">30 minutes</SelectItem>
                <SelectItem value="60">1 hour</SelectItem>
                <SelectItem value="90">1.5 hours</SelectItem>
                <SelectItem value="120">2 hours</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button onClick={handleAddSession} className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          Add Study Session
        </Button>

        <div className="border rounded-md">
          <div className="p-3 border-b bg-muted/50 font-medium">Your Study Sessions</div>
          {sessions.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground">No study sessions scheduled yet</div>
          ) : (
            <div className="divide-y">
              {sessions.map((session) => (
                <div key={session.id} className="p-3 flex justify-between items-center">
                  <div>
                    <p className="font-medium">{session.subject}</p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-3 w-3 mr-1" />
                      {formatDay(session.day)}
                      <Clock className="h-3 w-3 ml-2 mr-1" />
                      {session.startTime} ({session.duration} min)
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => handleRemoveSession(session.id)}>
                    <Trash2 className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
