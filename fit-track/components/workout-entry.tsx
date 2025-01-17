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
  const [exercises, setExercises] = useState([])

  const handleSave = () => {
    const workout = {
      date: date.toISOString().split("T")[0],
      exercises,
    }
    addWorkout(workout)
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

