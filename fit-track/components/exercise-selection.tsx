"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const predefinedExercises = [
  { name: "Push-ups", muscleGroup: "Chest" },
  { name: "Squats", muscleGroup: "Legs" },
  { name: "Pull-ups", muscleGroup: "Back" },
  // Add more predefined exercises
]

interface ExerciseSelectionProps {
  exercises: any[]
  onExercisesChange: (exercises: any[]) => void
}

export function ExerciseSelection({
  exercises,
  onExercisesChange,
}: ExerciseSelectionProps) {
  const [customExercise, setCustomExercise] = useState({
    name: "",
    muscleGroup: "",
    sets: "",
    reps: "",
  })

  const addExercise = (exercise: any) => {
    onExercisesChange([
      ...exercises,
      { ...exercise, sets: parseInt(exercise.sets), reps: parseInt(exercise.reps) },
    ])
  }

  const addCustomExercise = () => {
    if (
      customExercise.name &&
      customExercise.muscleGroup &&
      customExercise.sets &&
      customExercise.reps
    ) {
      addExercise(customExercise)
      setCustomExercise({ name: "", muscleGroup: "", sets: "", reps: "" })
    }
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Predefined Exercises</CardTitle>
          <CardDescription>Select from common exercises</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-2">
          {predefinedExercises.map((exercise) => (
            <Button
              key={exercise.name}
              variant="outline"
              className="w-full justify-start"
              onClick={() => addExercise({ ...exercise, sets: "3", reps: "10" })}
            >
              {exercise.name} - {exercise.muscleGroup}
            </Button>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Custom Exercise</CardTitle>
          <CardDescription>Add your own exercise</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Exercise Name</Label>
            <Input
              id="name"
              value={customExercise.name}
              onChange={(e) =>
                setCustomExercise({ ...customExercise, name: e.target.value })
              }
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="muscleGroup">Muscle Group</Label>
            <Input
              id="muscleGroup"
              value={customExercise.muscleGroup}
              onChange={(e) =>
                setCustomExercise({ ...customExercise, muscleGroup: e.target.value })
              }
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="sets">Sets</Label>
            <Input
              id="sets"
              type="number"
              value={customExercise.sets}
              onChange={(e) =>
                setCustomExercise({ ...customExercise, sets: e.target.value })
              }
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="reps">Reps</Label>
            <Input
              id="reps"
              type="number"
              value={customExercise.reps}
              onChange={(e) =>
                setCustomExercise({ ...customExercise, reps: e.target.value })
              }
            />
          </div>
          <Button onClick={addCustomExercise}>Add Custom Exercise</Button>
        </CardContent>
      </Card>
    </div>
  )
}

