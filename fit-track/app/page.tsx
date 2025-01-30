"use client"

import { useState } from "react"
import { WorkoutProvider } from "@/components/providers/workout-provider"
import Dashboard from "@/components/dashboard"
import WorkoutEntry from "@/components/workout-entry"
import Insights from "@/components/insights"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Home() {
  const [activeTab, setActiveTab] = useState("dashboard")

  return (
    <WorkoutProvider>
      <div className="container mx-auto p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="workout">Log Workout</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>
          <TabsContent value="dashboard">
            <Dashboard />
          </TabsContent>
          <TabsContent value="workout">
            <WorkoutEntry />
          </TabsContent>
          <TabsContent value="insights">
            <Insights />
          </TabsContent>
        </Tabs>
      </div>
    </WorkoutProvider>
  )
}

