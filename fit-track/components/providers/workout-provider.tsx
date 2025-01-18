"use client"

import React, { createContext, useState, useEffect, useContext } from "react"

interface Workout {
  date: string
  exercises: {
    name: string
    muscleGroup: string
    sets: number
    reps: number
  }[]
}

interface WorkoutContextType {
  workouts: Workout[]
  addWorkout: (workout: Workout) => void
  getMuscleSummary: () => Record<string, number>
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

  const addWorkout = (workout: Workout) => {
    try {
      const updatedWorkouts = [...workouts, workout]
      setWorkouts(updatedWorkouts)
      localStorage.setItem("workouts", JSON.stringify(updatedWorkouts))
    } catch (error) {
      console.error("Error saving workout to localStorage:", error)
    }
  }

  const getMuscleSummary = () => {
    const summary: Record<string, number> = {}
    workouts.forEach((workout) => {
      workout.exercises.forEach((exercise) => {
        if (summary[exercise.muscleGroup]) {
          summary[exercise.muscleGroup] += 1
        } else {
          summary[exercise.muscleGroup] = 1
        }
      })
    })
    return summary
  }

  return (
    <WorkoutContext.Provider value={{ workouts, addWorkout, getMuscleSummary }}>
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

