"use client"

import { useState, useEffect } from "react"
import { WorkoutProvider } from "@/components/providers/workout-provider"
import Dashboard from "@/components/dashboard"
import WorkoutEntry from "@/components/workout-entry"
import Insights from "@/components/insights"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ErrorBoundary from "@/components/error-boundary"

export default function Home() {
  const [activeTab, setActiveTab] = useState("dashboard")

  useEffect(() => {
    console.log("Home component mounted")
    return () => console.log("Home component unmounted")
  }, [])

  return (
    <ErrorBoundary>
      <WorkoutProvider>
        <div className="container mx-auto p-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="workout">Log Workout</TabsTrigger>
              <TabsTrigger value="insights">Insights</TabsTrigger>
            </TabsList>
            <TabsContent value="dashboard">
              <ErrorBoundary>
                <Dashboard />
              </ErrorBoundary>
            </TabsContent>
            <TabsContent value="workout">
              <ErrorBoundary>
                <WorkoutEntry />
              </ErrorBoundary>
            </TabsContent>
            <TabsContent value="insights">
              <ErrorBoundary>
                <Insights />
              </ErrorBoundary>
            </TabsContent>
          </Tabs>
        </div>
      </WorkoutProvider>
    </ErrorBoundary>
  )
}
