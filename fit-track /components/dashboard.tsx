"use client"

import { useWorkout } from "./providers/workout-provider"
import { MusclePhysiologyImage } from "./muscle-physiology-image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Dashboard() {
  const { getMuscleSummary } = useWorkout()

  return (
    <Card>
      <CardHeader>
        <CardTitle>FitTrack Dashboard</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center">
        <MusclePhysiologyImage muscleSummary={getMuscleSummary()} />
      </CardContent>
    </Card>
  )
}

