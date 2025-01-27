"use client";

import { useState, useCallback, useEffect } from "react"
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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Loader2 } from 'lucide-react'
import debounce from 'lodash.debounce'

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

interface Exercise {
  name: string
  type: string
  muscle: string
  equipment: string
  difficulty: string
  instructions: string
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
  const [searchResults, setSearchResults] = useState<Exercise[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)

  const searchExercises = useCallback(
    debounce(async (query: string) => {
      if (query.length < 2) {
        setSearchResults([])
        return
      }

      setIsSearching(true)
      try {
        const response = await fetch(
          `https://api.api-ninjas.com/v1/exercises?name=${encodeURIComponent(query)}`,
          {
            headers: {
              'X-Api-Key': 'rXSXRIqzOy7yXtqRCjCWgQ==yjMwa2JRCa6lGwRK'
            }
          }
        )
        if (!response.ok) {
          throw new Error('API request failed')
        }
        const data = await response.json()
        setSearchResults(data)
      } catch (error) {
        console.error('Error fetching exercises:', error)
        setSearchResults([])
      } finally {
        setIsSearching(false)
      }
    }, 300),
    []
  )

  useEffect(() => {
    if (customExercise.name.length >= 2) {
      searchExercises(customExercise.name)
    } else {
      setSearchResults([])
    }
  }, [customExercise.name, searchExercises])

  const addExercise = (exercise: Exercise) => {
    onExercisesChange([
      ...exercises,
      {
        name: exercise.name,
        muscleGroup: exercise.muscle,
        sets: parseInt(customExercise.sets) || 0,
        reps: parseInt(customExercise.reps) || 0,
      },
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

  const handleExerciseSelect = (exercise: Exercise) => {
    setCustomExercise(prev => ({
      ...prev,
      name: exercise.name,
      muscleGroup: exercise.muscle
    }))
    setIsPopoverOpen(false)
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
          <CardDescription>Search and add your own exercise</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Search Exercises</Label>
            <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
              <PopoverTrigger asChild>
                <Input
                  id="name"
                  value={customExercise.name}
                  onChange={(e) => {
                    const newValue = e.target.value
                    setCustomExercise(prev => ({ ...prev, name: newValue }))
                    if (newValue.length >= 2) {
                      setIsPopoverOpen(true)
                      searchExercises(newValue)
                    } else {
                      setIsPopoverOpen(false)
                    }
                  }}
                  placeholder="Type to search for exercises..."
                />
              </PopoverTrigger>
              <PopoverContent className="p-0" align="start">
                <Command>
                  <Input
                    placeholder="Search exercises..."
                    onChange={(e) => {
                      searchExercises(e.target.value);
                    }}
                  />
                  <CommandList>
                    <CommandEmpty>
                      {isSearching ? (
                        <div className="flex items-center justify-center p-4">
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Searching...
                        </div>
                      ) : (
                        'No exercises found.'
                      )}
                    </CommandEmpty>
                    <CommandGroup>
                      {searchResults.map((exercise) => (
                        <CommandItem
                          key={exercise.name}
                          onSelect={() => handleExerciseSelect(exercise)}
                        >
                          {exercise.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="exerciseName">Exercise Name</Label>
            <Input
              id="exerciseName"
              value={customExercise.name}
              readOnly
              placeholder="Selected exercise name"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="muscleGroup">Muscle Group</Label>
            <Input
              id="muscleGroup"
              value={customExercise.muscleGroup}
              readOnly
              placeholder="Auto-populated muscle group"
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

