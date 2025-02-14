"use client"

import { useState, useRef } from "react"
import { Pixelify_Sans as Pixelify } from "next/font/google"
import { useRouter } from "next/navigation"

const pixelify = Pixelify({ subsets: ["latin"], weight: "400" })

export default function ValentinePage() {
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 })
  const [isNoButtonMoved, setIsNoButtonMoved] = useState(false)
  const noButtonRef = useRef<HTMLButtonElement>(null)
  const router = useRouter()

  const moveNoButton = () => {
    const maxX = window.innerWidth - 100
    const maxY = window.innerHeight - 50
    const newX = Math.random() * maxX
    const newY = Math.random() * maxY
    setNoButtonPosition({ x: newX, y: newY })
    setIsNoButtonMoved(true)
  }

  const handleYesClick = () => {
    router.push("/celebration")
  }

  return (
    <div
      className={`min-h-screen bg-[#FFF4A3] flex flex-col items-center justify-center p-4 relative ${pixelify.className}`}
    >
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-red-600 mb-8 pixel-text">Will you be my Valentine?</h1>
        <div className="space-x-4">
          <button onClick={handleYesClick} className="bg-red-500 text-white font-bold py-2 px-4 text-xl pixel-button">
            Yes
          </button>
          <button
            ref={noButtonRef}
            onMouseEnter={moveNoButton}
            style={{
              position: isNoButtonMoved ? "fixed" : "static",
              left: isNoButtonMoved ? `${noButtonPosition.x}px` : "auto",
              top: isNoButtonMoved ? `${noButtonPosition.y}px` : "auto",
              transition: "all 0.2s ease-in-out",
            }}
            className="bg-blue-500 text-white font-bold py-2 px-4 text-xl pixel-button"
          >
            No
          </button>
        </div>
      </div>
    </div>
  )
}

