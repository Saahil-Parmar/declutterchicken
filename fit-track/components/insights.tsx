"use client"

import { useWorkout } from "./providers/workout-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Trophy, AlertTriangle } from "lucide-react"

export default function Insights() {
  const { getMuscleSummary, getMaxWorkedOutMuscle, getNotWorkedOutMuscles } = useWorkout()
  const muscleSummary = getMuscleSummary()
  const maxWorkedOutMuscle = getMaxWorkedOutMuscle()
  const notWorkedOutMuscles = getNotWorkedOutMuscles()

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Workout Insights</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {maxWorkedOutMuscle && (
            <Alert>
              <Trophy className="h-4 w-4" />
              <AlertTitle>Most Worked Out Muscle This Week</AlertTitle>
              <AlertDescription>
                {maxWorkedOutMuscle.muscle} - {maxWorkedOutMuscle.sets} sets
              </AlertDescription>
            </Alert>
          )}
          {notWorkedOutMuscles.length > 0 && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Not Worked Out Muscles This Week</AlertTitle>
              <AlertDescription>{notWorkedOutMuscles.join(", ")}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Workout Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Muscle Group</TableHead>
                <TableHead className="text-right">Total Sets</TableHead>
                <TableHead className="text-right">Last Workout Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries(muscleSummary).map(([muscle, { sets, lastWorkoutDate }]) => (
                <TableRow key={muscle}>
                  <TableCell>{muscle}</TableCell>
                  <TableCell className="text-right">{sets}</TableCell>
                  <TableCell className="text-right">{new Date(lastWorkoutDate).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

