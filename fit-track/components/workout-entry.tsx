"use client"

import { useState } from "react"
import { useWorkout } from "./providers/workout-provider"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExerciseSelection } from "./exercise-selection"
import { Button } from "@/components/ui/button"

export default function WorkoutEntry() {
  const { addWorkout } = useWorkout()
  const [date, setDate] = useState<Date>(new Date())
  const [exercises, setExercises] = useState<Array<{
    name: string;
    muscleGroup: string;
    sets: number;
    reps: number;
  }>>([])

  const handleSave = () => {
    if (exercises.length === 0) {
      alert("Please add at least one exercise before saving the workout.")
      return
    }
    const workout = {
      date: date.toISOString().split("T")[0],
      exercises,
    }
    addWorkout(workout)
    setExercises([]) // Reset exercises after saving
    alert("Workout saved successfully!")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Log Workout</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(date) => date && setDate(date)}
          className="rounded-md border"
        />
        <ExerciseSelection
          exercises={exercises}
          onExercisesChange={setExercises}
        />
        <Button onClick={handleSave} className="w-full">
          Save Workout
        </Button>
      </CardContent>
    </Card>
  )
}

