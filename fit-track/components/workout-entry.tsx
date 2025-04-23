"use client"

import { useState } from "react"
import { useWorkout } from "./providers/workout-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExerciseSelection } from "./exercise-selection"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

export default function WorkoutEntry() {
  const { addWorkout } = useWorkout()
  const { toast } = useToast()
  const [exercises, setExercises] = useState([])

  const handleSave = () => {
    if (exercises.length === 0) {
      toast({
        variant: "destructive",
        title: "No exercises added",
        description: "Please add at least one exercise before saving the workout.",
      })
      return
    }

    const workout = {
      date: new Date().toISOString().split("T")[0],
      exercises: exercises,
    }
    addWorkout(workout)
    setExercises([])
    toast({
      title: "Success",
      description: "Workout saved successfully!",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Log Workout</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <ExerciseSelection exercises={exercises} onExercisesChange={setExercises} />
        <Button onClick={handleSave} className="w-full" disabled={exercises.length === 0}>
          Save Workout
        </Button>
      </CardContent>
    </Card>
  )
}

