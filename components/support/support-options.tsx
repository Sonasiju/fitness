import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, UserPlus, MessageCircle, Calendar } from "lucide-react"

export function SupportOptions() {
  const supportOptions = [
    {
      id: 1,
      title: "Peer Support Group",
      description:
        "Join a small group of peers to discuss common challenges and share experiences in a safe, confidential environment.",
      icon: Users,
      action: "Join Group",
      availability: "Available",
      link: "#",
    },
    {
      id: 2,
      title: "One-on-One Mentoring",
      description:
        "Connect with a trained student mentor who can provide guidance, advice, and support for academic or personal challenges.",
      icon: UserPlus,
      action: "Request Mentor",
      availability: "Available",
      link: "#",
    },
    {
      id: 3,
      title: "Anonymous Chat Support",
      description:
        "Chat anonymously with a trained counselor about any issues you're facing, with no appointment needed.",
      icon: MessageCircle,
      action: "Start Chat",
      availability: "Available 24/7",
      link: "#",
    },
    {
      id: 4,
      title: "Professional Counseling",
      description:
        "Schedule a confidential session with a professional counselor from the university's counseling services.",
      icon: Calendar,
      action: "Book Appointment",
      availability: "By Appointment",
      link: "#",
    },
  ]

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Support Options</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {supportOptions.map((option) => (
            <div key={option.id} className="border rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <option.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium">{option.title}</h3>
                    <Badge variant="outline" className="text-xs">
                      {option.availability}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{option.description}</p>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-3" asChild>
                <a href={option.link}>{option.action}</a>
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
