"use client"

import { useWorkout } from "./providers/workout-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MusclePhysiologyImage } from "./muscle-physiology-image"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Dumbbell, LineChart, Settings } from "lucide-react"

function getRecommendations(muscleSummary: Record<string, number>): string[] {
  const recommendations: string[] = []
  const underworkedMuscles = Object.entries(muscleSummary)
    .filter(([_, days]) => days > 3)
    .map(([muscle]) => muscle)

  if (underworkedMuscles.length > 0) {
    recommendations.push(`Focus on ${underworkedMuscles.join(", ")} as these areas need attention.`)
  }

  // Add general recommendations
  recommendations.push(
    "Increase workout intensity to balance upper and lower body.",
    "Incorporate more compound exercises to improve overall strength.",
    "Focus on core exercises to enhance stability.",
  )

  return recommendations
}

export default function Insights() {
  const { workouts, getMuscleSummary } = useWorkout()
  const muscleSummary = getMuscleSummary()

  const recommendations = getRecommendations(muscleSummary)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Muscle Insights</CardTitle>
        <CardDescription>Track your muscle activation and get personalized recommendations</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-center">
          <MusclePhysiologyImage muscleSummary={muscleSummary} />
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Muscle Activation Levels</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-[#4CAF50]" />
              <span>Highly Activated (Last 24 hours)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-[#8BC34A]" />
              <span>Recently Activated (1 day ago)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-[#FFC107]" />
              <span>Moderately Activated (2-3 days ago)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-[#F44336]" />
              <span>Underworked (>3 days)</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recommendations</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2">
            {recommendations.map((recommendation, index) => (
              <Alert key={index}>
                <AlertDescription>{recommendation}</AlertDescription>
              </Alert>
            ))}
          </CardContent>
        </Card>

        <div className="flex justify-around pt-4">
          <Dumbbell className="h-6 w-6 text-muted-foreground" />
          <LineChart className="h-6 w-6 text-muted-foreground" />
          <Settings className="h-6 w-6 text-muted-foreground" />
        </div>
      </CardContent>
    </Card>
  )
}

