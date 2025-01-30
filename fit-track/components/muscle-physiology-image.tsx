"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { getMuscleColor } from "@/lib/utils"

interface MusclePhysiologyImageProps {
  muscleSummary: Record<string, number>
}

export function MusclePhysiologyImage({ muscleSummary }: MusclePhysiologyImageProps) {
  const [showingFront, setShowingFront] = useState(true)
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    console.log("MusclePhysiologyImage mounted")
    return () => {
      console.log("MusclePhysiologyImage unmounted")
    }
  }, [])

  // Calculate progress values (0-100) based on sets
  const getProgress = (muscle: string) => {
    const sets = muscleSummary[muscle] || 0
    // Assuming 20 sets per week is 100%
    return Math.min((sets / 20) * 100, 100)
  }

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.error("Image failed to load", e)
    setImageError(true)
  }

  const frontImageUrl =
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DALL%C2%B7E%202025-01-29%2016.12.17%20-%20A%20single,%20full-body,%20detailed,%20and%20clean%20vector-style%20illustration%20of%20the%20frontal%20human%20muscle%20anatomy.%20The%20design%20should%20display%20all%20major%20muscle%20gro-4yxrE6bphdbN0QkTCuDfOG8F7Hp2uy.webp"
  const backImageUrl =
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/back.jpg-t5EjxDirhL48EQEodUrUQeFl7HDb7t.jpeg"

  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="relative w-[400px] h-[600px] bg-[#f5f5f5] rounded-lg p-4">
        {!imageError ? (
          <Image
            src={showingFront ? frontImageUrl : backImageUrl}
            alt={`Muscle physiology diagram - ${showingFront ? "front" : "back"} view`}
            fill
            className="object-contain p-2"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={handleImageError}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            Image failed to load
          </div>
        )}
        {!imageError &&
          Object.entries(muscleSummary).map(([muscle, lastWorked]) => {
            // Only show overlays when there's activity to report
            if (lastWorked > 0) {
              return (
                <div
                  key={muscle}
                  className="absolute inset-0 opacity-30 mix-blend-multiply"
                  style={{ backgroundColor: getMuscleColor(lastWorked) }}
                />
              )
            }
            return null
          })}
      </div>

      <Button variant="outline" onClick={() => setShowingFront(!showingFront)} className="w-40">
        Show {showingFront ? "Back" : "Front"}
      </Button>

      <div className="w-full max-w-md bg-muted p-6 rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold mb-4">CORE Areas</h2>
        <div className="space-y-4">
          {["Back", "Shoulders", "Arms", "Legs"].map((muscle) => (
            <div key={muscle} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium">{muscle}</span>
                <span className="text-sm text-muted-foreground">{muscleSummary[muscle] || 0} sets</span>
              </div>
              <Progress value={getProgress(muscle)} className="h-2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

