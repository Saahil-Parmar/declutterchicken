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
          src="/iR5UF401-Y1juN8aG0y9XxctWmpNAUvYcqUipV6.svg"
          alt="Muscle physiology diagram"
          fill
          className="object-contain"
          width={450}
          height={469}
        />
        {Object.entries(muscleSummary).map(([muscle, lastWorked]) => {
          // Calculate the position and size of the overlay based on the muscle group
          const positionStyle = {
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }
          return (
            <div
              key={muscle}
              className="absolute opacity-50"
              style={{ ...positionStyle, backgroundColor: getMuscleColor(lastWorked) }}
            />
          )
        })}
      </div>
      <Button variant="outline" className="mt-4" onClick={() => setShowingFront(!showingFront)}>
        Show {showingFront ? "Back" : "Front"}
      </Button>
    </div>
  )
}

