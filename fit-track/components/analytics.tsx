"use client"

import { useWorkout } from "./providers/workout-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function Analytics() {
  const { getMuscleSummary } = useWorkout()
  const muscleSummary = getMuscleSummary()

  return (
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
  )
}

