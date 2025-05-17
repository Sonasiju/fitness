"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarDays, Plus } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"

export function UpcomingReminders() {
  const [reminders, setReminders] = useState([
    {
      id: 1,
      title: "Math Assignment",
      date: "Today, 11:59 PM",
      priority: "high",
    },
    {
      id: 2,
      title: "Study Group Meeting",
      date: "Tomorrow, 3:00 PM",
      priority: "medium",
    },
    {
      id: 3,
      title: "Physics Quiz",
      date: "Friday, 10:00 AM",
      priority: "high",
    },
  ])

  const [newReminder, setNewReminder] = useState({
    title: "",
    date: "",
    time: "",
    priority: "medium",
  })

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isViewAllOpen, setIsViewAllOpen] = useState(false)
  const { toast } = useToast()

  const handleAddReminder = () => {
    if (!newReminder.title || !newReminder.date) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    const formattedDate = new Date(newReminder.date)
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    let dateText = ""
    if (formattedDate.toDateString() === today.toDateString()) {
      dateText = "Today"
    } else if (formattedDate.toDateString() === tomorrow.toDateString()) {
      dateText = "Tomorrow"
    } else {
      dateText = formattedDate.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })
    }

    const timeText = newReminder.time || "11:59 PM"

    const id = reminders.length ? Math.max(...reminders.map((r) => r.id)) + 1 : 1

    const reminder = {
      id,
      title: newReminder.title,
      date: `${dateText}, ${timeText}`,
      priority: newReminder.priority,
    }

    setReminders([...reminders, reminder])
    setNewReminder({
      title: "",
      date: "",
      time: "",
      priority: "medium",
    })

    setIsDialogOpen(false)

    toast({
      title: "Reminder added",
      description: "Your reminder has been added successfully",
    })
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Upcoming Reminders</CardTitle>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Reminder</DialogTitle>
              <DialogDescription>Create a new reminder for your upcoming tasks.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Enter reminder title"
                  value={newReminder.title}
                  onChange={(e) => setNewReminder({ ...newReminder, title: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newReminder.date}
                    onChange={(e) => setNewReminder({ ...newReminder, date: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={newReminder.time}
                    onChange={(e) => setNewReminder({ ...newReminder, time: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="priority">Priority</Label>
                <Select
                  value={newReminder.priority}
                  onValueChange={(value) => setNewReminder({ ...newReminder, priority: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddReminder}>Add Reminder</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {reminders.slice(0, 3).map((reminder, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div
                className={`w-2 h-2 mt-2 rounded-full ${
                  reminder.priority === "high"
                    ? "bg-red-500"
                    : reminder.priority === "medium"
                      ? "bg-yellow-500"
                      : "bg-green-500"
                }`}
              />
              <div className="flex-1">
                <p className="font-medium">{reminder.title}</p>
                <div className="flex items-center text-xs text-muted-foreground">
                  <CalendarDays className="h-3 w-3 mr-1" />
                  {reminder.date}
                </div>
              </div>
            </div>
          ))}
        </div>

        <Dialog open={isViewAllOpen} onOpenChange={setIsViewAllOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full mt-4" size="sm">
              View All Reminders
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>All Reminders</DialogTitle>
              <DialogDescription>View and manage all your upcoming reminders.</DialogDescription>
            </DialogHeader>
            <div className="max-h-[400px] overflow-y-auto">
              {reminders.length === 0 ? (
                <p className="text-center py-4 text-muted-foreground">No reminders found</p>
              ) : (
                <div className="space-y-4 py-4">
                  {reminders.map((reminder) => (
                    <div key={reminder.id} className="flex items-start space-x-3 border-b pb-3">
                      <div
                        className={`w-3 h-3 mt-1.5 rounded-full ${
                          reminder.priority === "high"
                            ? "bg-red-500"
                            : reminder.priority === "medium"
                              ? "bg-yellow-500"
                              : "bg-green-500"
                        }`}
                      />
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <p className="font-medium">{reminder.title}</p>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={() => {
                              setReminders(reminders.filter((r) => r.id !== reminder.id))
                              toast({
                                title: "Reminder deleted",
                                description: "Your reminder has been deleted",
                              })
                            }}
                          >
                            ×
                          </Button>
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <CalendarDays className="h-3 w-3 mr-1" />
                          {reminder.date}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsViewAllOpen(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}
