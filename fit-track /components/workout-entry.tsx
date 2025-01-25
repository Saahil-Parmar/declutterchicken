"use client"

import { useState } from "react"
import { useWorkout } from "./providers/workout-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExerciseSelection } from "./exercise-selection"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export default function WorkoutEntry() {
  const { addWorkout } = useWorkout()
  const { toast } = useToast()
  const [selectedDate, setSelectedDate] = useState<"today" | "yesterday">("today")
  const [exercises, setExercises] = useState<
    Array<{
      name: string
      muscleGroup: string
      sets: number
      reps: number
    }>
  >([])

  const handleSave = () => {
    if (exercises.length === 0) {
      toast({
        variant: "destructive",
        title: "No exercises added",
        description: "Please add at least one exercise before saving the workout.",
      })
      return
    }

    const today = new Date()
    const workoutDate = selectedDate === "today" ? today : new Date(today.setDate(today.getDate() - 1))

    const workout = {
      date: workoutDate.toISOString().split("T")[0],
      exercises: exercises.map((exercise) => ({
        ...exercise,
        name: exercise.name || "Unnamed Exercise",
        muscleGroup: exercise.muscleGroup || "Unspecified",
        sets: exercise.sets || 0,
        reps: exercise.reps || 0,
      })),
    }
    addWorkout(workout)
    setExercises([]) // Reset exercises after saving
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
        <RadioGroup defaultValue="today" onValueChange={(value) => setSelectedDate(value as "today" | "yesterday")}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="today" id="today" />
            <Label htmlFor="today">Today</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yesterday" id="yesterday" />
            <Label htmlFor="yesterday">Yesterday</Label>
          </div>
        </RadioGroup>
        <ExerciseSelection exercises={exercises} onExercisesChange={setExercises} />
        <Button onClick={handleSave} className="w-full" disabled={exercises.length === 0}>
          Save Workout
        </Button>
      </CardContent>
    </Card>
  )
}

