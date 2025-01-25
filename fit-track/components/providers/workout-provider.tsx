"use client"

import type React from "react"
import { createContext, useState, useEffect, useContext } from "react"

interface Exercise {
  name: string
  muscleGroup: string
  sets: number
  reps: number
}

interface Workout {
  date: string
  exercises: Exercise[]
}

interface WorkoutContextType {
  workouts: Workout[]
  addWorkout: (workout: Workout) => void
  getMuscleSummary: () => Record<string, { sets: number; lastWorkoutDate: string }>
  getMaxWorkedOutMuscle: () => { muscle: string; sets: number } | null
  getNotWorkedOutMuscles: () => string[]
}

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined)

export const WorkoutProvider = ({ children }: { children: React.ReactNode }) => {
  const [workouts, setWorkouts] = useState<Workout[]>([])

  useEffect(() => {
    try {
      const storedWorkouts = localStorage.getItem("workouts")
      if (storedWorkouts) {
        setWorkouts(JSON.parse(storedWorkouts))
      }
    } catch (error) {
      console.error("Error loading workouts from localStorage:", error)
    }
  }, [])

  const normalizeMuscleGroup = (muscleGroup: string): string => {
    const normalized = muscleGroup.toLowerCase()
    if (normalized === "shoulders") return "Shoulders"
    if (normalized === "abdominals" || normalized === "abs") return "Abs"
    return muscleGroup
  }

  const addWorkout = (workout: Workout) => {
    try {
      const normalizedWorkout = {
        ...workout,
        exercises: workout.exercises.map((exercise) => ({
          ...exercise,
          muscleGroup: normalizeMuscleGroup(exercise.muscleGroup),
        })),
      }
      const updatedWorkouts = [...workouts, normalizedWorkout]
      setWorkouts(updatedWorkouts)
      localStorage.setItem("workouts", JSON.stringify(updatedWorkouts))
    } catch (error) {
      console.error("Error saving workout to localStorage:", error)
    }
  }

  const getMuscleSummary = () => {
    const summary: Record<string, { sets: number; lastWorkoutDate: string }> = {}

    workouts.forEach((workout) => {
      workout.exercises.forEach((exercise) => {
        const normalizedMuscleGroup = normalizeMuscleGroup(exercise.muscleGroup)
        if (
          !summary[normalizedMuscleGroup] ||
          new Date(workout.date) > new Date(summary[normalizedMuscleGroup].lastWorkoutDate)
        ) {
          summary[normalizedMuscleGroup] = {
            sets: exercise.sets,
            lastWorkoutDate: workout.date,
          }
        } else {
          summary[normalizedMuscleGroup].sets += exercise.sets
        }
      })
    })

    return summary
  }

  const getMaxWorkedOutMuscle = () => {
    const today = new Date()
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()))
    startOfWeek.setHours(0, 0, 0, 0)

    const muscleGroups: Record<string, number> = {}

    workouts.forEach((workout) => {
      const workoutDate = new Date(workout.date)
      if (workoutDate >= startOfWeek) {
        workout.exercises.forEach((exercise) => {
          const normalizedMuscleGroup = normalizeMuscleGroup(exercise.muscleGroup)
          if (muscleGroups[normalizedMuscleGroup]) {
            muscleGroups[normalizedMuscleGroup] += exercise.sets
          } else {
            muscleGroups[normalizedMuscleGroup] = exercise.sets
          }
        })
      }
    })

    if (Object.keys(muscleGroups).length === 0) {
      return null
    }

    const maxMuscle = Object.entries(muscleGroups).reduce(
      (max, [muscle, sets]) => (sets > max.sets ? { muscle, sets } : max),
      { muscle: "", sets: 0 },
    )

    return maxMuscle
  }

  const getNotWorkedOutMuscles = () => {
    const today = new Date()
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()))
    startOfWeek.setHours(0, 0, 0, 0)

    const muscleGroups: Set<string> = new Set([
      "Chest",
      "Back",
      "Legs",
      "Shoulders",
      "Biceps",
      "Triceps",
      "Abs",
      "Calves",
    ])

    const workedOutMuscles: Set<string> = new Set()

    workouts.forEach((workout) => {
      const workoutDate = new Date(workout.date)
      if (workoutDate >= startOfWeek) {
        workout.exercises.forEach((exercise) => {
          if (exercise.sets > 0) {
            workedOutMuscles.add(normalizeMuscleGroup(exercise.muscleGroup))
          }
        })
      }
    })

    return Array.from(muscleGroups).filter((muscle) => !workedOutMuscles.has(muscle))
  }

  return (
    <WorkoutContext.Provider
      value={{ workouts, addWorkout, getMuscleSummary, getMaxWorkedOutMuscle, getNotWorkedOutMuscles }}
    >
      {children}
    </WorkoutContext.Provider>
  )
}

export const useWorkout = () => {
  const context = useContext(WorkoutContext)
  if (context === undefined) {
    throw new Error("useWorkout must be used within a WorkoutProvider")
  }
  return context
}

