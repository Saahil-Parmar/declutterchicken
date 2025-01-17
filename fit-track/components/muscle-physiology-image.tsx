"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { getMuscleColor } from "@/lib/utils"

interface MusclePhysiologyImageProps {
  muscleSummary: Record<string, number>
}

export function MusclePhysiologyImage({ muscleSummary }: MusclePhysiologyImageProps) {
  const [showingFront, setShowingFront] = useState(true)

  return (
    <div className="relative flex flex-col items-center">
      <div className="relative w-[300px] h-[500px]">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/gettyimages-1178749273-612x612.jpg-scvFf44si6xOfOzQff2mwzMmwjeBSa.jpeg"
          alt="Muscle physiology diagram"
          fill
          className="object-contain"
        />
        {Object.entries(muscleSummary).map(([muscle, lastWorked]) => (
          <div
            key={muscle}
            className="absolute opacity-50"
            style={{ backgroundColor: getMuscleColor(lastWorked) }}
          />
        ))}
      </div>
      <Button
        variant="outline"
        className="mt-4"
        onClick={() => setShowingFront(!showingFront)}
      >
        Show {showingFront ? "Back" : "Front"}
      </Button>
    </div>
  )
}

