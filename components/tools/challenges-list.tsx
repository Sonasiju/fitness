"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trophy, CheckCircle, Circle } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export function ChallengesList() {
  const { toast } = useToast()
  const [selectedChallenge, setSelectedChallenge] = useState<any>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const [challenges, setChallenges] = useState([
    {
      id: 1,
      title: "Study Streak",
      description: "Study for at least 30 minutes every day for 7 days",
      progress: 5,
      total: 7,
      reward: "50 points",
      status: "in-progress",
    },
    {
      id: 2,
      title: "Resource Explorer",
      description: "Access 5 different well-being resources",
      progress: 3,
      total: 5,
      reward: "30 points",
      status: "in-progress",
    },
    {
      id: 3,
      title: "Community Contributor",
      description: "Make 3 helpful comments in the community forum",
      progress: 3,
      total: 3,
      reward: "40 points + Badge",
      status: "completed",
    },
    {
      id: 4,
      title: "Mood Tracker",
      description: "Log your mood for 10 consecutive days",
      progress: 0,
      total: 10,
      reward: "60 points",
      status: "not-started",
    },
  ])

  const [totalPoints, setTotalPoints] = useState(120)

  const handleContinueChallenge = (challenge: any) => {
    setSelectedChallenge(challenge)
    setIsDialogOpen(true)
  }

  const handleStartChallenge = (challengeId: number) => {
    setChallenges(
      challenges.map((challenge) =>
        challenge.id === challengeId ? { ...challenge, status: "in-progress", progress: 1 } : challenge,
      ),
    )

    toast({
      title: "Challenge started",
      description: "You've started a new challenge. Good luck!",
    })
  }

  const handleUpdateProgress = () => {
    if (!selectedChallenge) return

    const updatedChallenges = challenges.map((challenge) => {
      if (challenge.id === selectedChallenge.id) {
        const newProgress = challenge.progress + 1
        const newStatus = newProgress >= challenge.total ? "completed" : "in-progress"

        // Award points if challenge is completed
        if (newStatus === "completed" && challenge.status !== "completed") {
          const pointsToAdd = Number.parseInt(challenge.reward.split(" ")[0])
          setTotalPoints((prev) => prev + pointsToAdd)

          toast({
            title: "Challenge completed!",
            description: `Congratulations! You've earned ${pointsToAdd} points.`,
          })
        }

        return {
          ...challenge,
          progress: Math.min(newProgress, challenge.total),
          status: newStatus,
        }
      }
      return challenge
    })

    setChallenges(updatedChallenges)
    setIsDialogOpen(false)
  }

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="flex items-center">
          <Trophy className="h-5 w-5 mr-2 text-primary" />
          Challenges
        </CardTitle>
        <Badge variant="outline" className="ml-2">
          {totalPoints} Points
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {challenges.map((challenge) => (
            <div key={challenge.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium">{challenge.title}</h3>
                {challenge.status === "completed" ? (
                  <Badge className="bg-green-500">Completed</Badge>
                ) : challenge.status === "in-progress" ? (
                  <Badge variant="outline">In Progress</Badge>
                ) : (
                  <Badge variant="outline" className="bg-muted text-muted-foreground">
                    Not Started
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground mb-3">{challenge.description}</p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>
                    {challenge.progress}/{challenge.total}
                  </span>
                </div>
                <Progress value={(challenge.progress / challenge.total) * 100} className="h-2" />
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Reward: {challenge.reward}</span>
                  {challenge.status === "completed" ? (
                    <Button variant="outline" size="sm" disabled>
                      <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                      Claimed
                    </Button>
                  ) : challenge.status === "in-progress" ? (
                    <Button variant="outline" size="sm" onClick={() => handleContinueChallenge(challenge)}>
                      Continue
                    </Button>
                  ) : (
                    <Button variant="outline" size="sm" onClick={() => handleStartChallenge(challenge.id)}>
                      <Circle className="h-4 w-4 mr-2" />
                      Start
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}

          <Button variant="outline" className="w-full">
            View All Challenges
          </Button>
        </div>
      </CardContent>

      {/* Challenge Progress Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{selectedChallenge?.title}</DialogTitle>
            <DialogDescription>{selectedChallenge?.description}</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Your Progress</h4>
                <Progress value={(selectedChallenge?.progress / selectedChallenge?.total) * 100} className="h-3" />
                <div className="flex justify-between mt-2 text-sm">
                  <span>
                    {selectedChallenge?.progress} of {selectedChallenge?.total} completed
                  </span>
                  <span>{Math.round((selectedChallenge?.progress / selectedChallenge?.total) * 100)}%</span>
                </div>
              </div>

              <div className="bg-muted p-4 rounded-md">
                <h4 className="text-sm font-medium mb-1">Next Step</h4>
                {selectedChallenge?.id === 1 && (
                  <p className="text-sm">Study for at least 30 minutes today to continue your streak.</p>
                )}
                {selectedChallenge?.id === 2 && (
                  <p className="text-sm">Access another well-being resource to progress.</p>
                )}
                {selectedChallenge?.id === 4 && (
                  <p className="text-sm">Log your mood today to start your tracking streak.</p>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateProgress}>Update Progress</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
