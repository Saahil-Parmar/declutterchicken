"use client"

import { useState } from "react"
import Dashboard from "@/components/dashboard"
import WorkoutEntry from "@/components/workout-entry"
import Analytics from "@/components/analytics"
import Insights from "@/components/insights"
import { WorkoutProvider } from "@/components/providers/workout-provider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Home() {
  return (
    <WorkoutProvider>
      <div className="container mx-auto p-4">
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="workout">Log Workout</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>
          <TabsContent value="dashboard">
            <Dashboard />
          </TabsContent>
          <TabsContent value="workout">
            <WorkoutEntry />
          </TabsContent>
          <TabsContent value="analytics">
            <Analytics />
          </TabsContent>
          <TabsContent value="insights">
            <Insights />
          </TabsContent>
        </Tabs>
      </div>
    </WorkoutProvider>
  )
}
