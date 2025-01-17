"use client"

import { useWorkout } from "./providers/workout-provider"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function Analytics() {
  const { workouts, getMuscleSummary } = useWorkout()
  const muscleSummary = getMuscleSummary()

  return (
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
              <TableHead className="text-right">Workout Count</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Object.entries(muscleSummary).map(([muscle, count]) => (
              <TableRow key={muscle}>
                <TableCell>{muscle}</TableCell>
                <TableCell className="text-right">{count}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

