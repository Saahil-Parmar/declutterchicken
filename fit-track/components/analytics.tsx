"use client"

import { useWorkout } from "./providers/workout-provider"
import { normalizeMuscleGroup } from "./providers/workout-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Trophy, AlertTriangle } from "lucide-react"

export default function Analytics() {
  const { getMuscleSummary, getMaxWorkedOutMuscle, getNotWorkedOutMuscles } = useWorkout()
  const muscleSummary = getMuscleSummary()
  const maxWorkedOutMuscle = getMaxWorkedOutMuscle()
  const notWorkedOutMuscles = getNotWorkedOutMuscles()

  return (
    <div className="space-y-4">
      {notWorkedOutMuscles.length > 0 && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Not Worked Out Muscles This Week</AlertTitle>
          <AlertDescription>{notWorkedOutMuscles.join(", ")}</AlertDescription>
        </Alert>
      )}

      {maxWorkedOutMuscle && (
        <Alert>
          <Trophy className="h-4 w-4" />
          <AlertTitle>Max Worked Out Muscle This Week</AlertTitle>
          <AlertDescription>
            {maxWorkedOutMuscle.muscle} - {maxWorkedOutMuscle.sets} sets
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Workout Analytics</CardTitle>
          <CardDescription>Track your progress across muscle groups</CardDescription>
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
                  <TableCell>{normalizeMuscleGroup(muscle)}</TableCell>
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

