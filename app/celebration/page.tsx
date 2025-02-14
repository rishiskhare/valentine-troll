"use client"

import { useState, useEffect, useRef } from "react"
import { Pixelify_Sans as Pixelify } from "next/font/google"
import Image from "next/image"
import type React from "react"

const pixelify = Pixelify({ subsets: ["latin"], weight: "400" })

// New Confetti component
const Confetti = ({ emoji }: { emoji: string }) => {
  const style = {
    position: "fixed",
    left: `${Math.random() * 100}vw`,
    animationDuration: `${Math.random() * 3 + 2}s`,
    fontSize: `${Math.random() * 1.5 + 0.7}rem`,
    zIndex: 9999,
  }
  return (
    <div style={style as React.CSSProperties} className="confetti">
      {emoji}
    </div>
  )
}

export default function CelebrationPage() {
  const fileInputRef1 = useRef<HTMLInputElement>(null)
  const fileInputRef2 = useRef<HTMLInputElement>(null)
  const fileInputRef3 = useRef<HTMLInputElement>(null)
  const fileInputRef4 = useRef<HTMLInputElement>(null)
  const fileInputRef5 = useRef<HTMLInputElement>(null)
  const fileInputRef6 = useRef<HTMLInputElement>(null)

  const fileInputRefs = [fileInputRef1, fileInputRef2, fileInputRef3, fileInputRef4, fileInputRef5, fileInputRef6]

  const [confetti, setConfetti] = useState<React.JSX.Element[]>([])
  const [uploadedImages, setUploadedImages] = useState<string[]>(Array(6).fill("/placeholder.svg"))

  useEffect(() => {
    const hearts = ["❤️", "💖", "💕", "💗", "💓", "💘", "💝"]
    const newConfetti = Array(50)
      .fill(null)
      .map((_, i) => <Confetti key={i} emoji={hearts[Math.floor(Math.random() * hearts.length)]} />)
    setConfetti(newConfetti)

    // Load saved images from local storage
    const loadSavedImages = () => {
      try {
        const savedImages = localStorage.getItem("valentineImages")
        if (savedImages) {
          setUploadedImages(JSON.parse(savedImages))
        }
      } catch (error) {
        console.error("Error loading images from local storage:", error)
      }
    }

    loadSavedImages()
  }, [])

  const handleImageClick = (index: number) => {
    fileInputRefs[index].current?.click()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string
        const newImages = [...uploadedImages]
        newImages[index] = imageUrl
        setUploadedImages(newImages)

        // Save to local storage
        try {
          localStorage.setItem("valentineImages", JSON.stringify(newImages))
        } catch (error) {
          console.error("Error saving images to local storage:", error)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const confettiStyle = `
  @keyframes fall {
    0% { transform: translateY(-100vh) rotate(0deg); }
    100% { transform: translateY(100vh) rotate(360deg); }
  }
  .confetti {
    position: fixed;
    animation: fall linear forwards;
  }
  @keyframes float {
    0%, 100% { transform: translateY(0) translateX(0); }
    25% { transform: translateY(-5px) translateX(5px); }
    50% { transform: translateY(5px) translateX(-5px); }
    75% { transform: translateY(5px) translateX(5px); }
  }
  .floating-image {
    animation: float 6s ease-in-out infinite;
  }
  .floating-image-slow {
    animation: float 8s ease-in-out infinite;
  }
  .floating-image-fast {
    animation: float 4s ease-in-out infinite;
  }
`

  return (
    <>
      <style jsx global>
        {confettiStyle}
      </style>
      {confetti}
      <div
        className={`min-h-screen bg-pink-200 flex flex-col items-center justify-center p-8 sm:p-16 md:p-24 ${pixelify.className}`}
      >
        <div className="relative w-full max-w-4xl mx-auto">
          {/* Hidden file inputs */}
          {fileInputRefs.map((ref, index) => (
            <input
              key={index}
              type="file"
              ref={ref}
              className="hidden"
              accept="image/*"
              onChange={(e) => handleFileChange(e, index)}
            />
          ))}

          {/* Top left image */}
          <div
            className="absolute -top-16 sm:-top-24 -left-16 sm:-left-24 w-24 sm:w-32 aspect-square floating-image cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => handleImageClick(0)}
          >
            <Image
              src={uploadedImages[0] || "/image1.png"}
              alt="Valentine's image 1"
              fill
              className="rounded-full object-cover"
            />
          </div>
          {/* Top center image */}
          <div
            className="absolute -top-24 sm:-top-32 inset-x-0 mx-auto w-32 sm:w-40 aspect-square floating-image-slow cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => handleImageClick(1)}
          >
            <Image
              src={uploadedImages[1] || "/image2.png"}
              alt="Valentine's image 2"
              fill
              className="rounded-full object-cover"
            />
          </div>
          {/* Top right image */}
          <div
            className="absolute -top-16 sm:-top-24 -right-16 sm:-right-24 w-24 sm:w-32 aspect-square floating-image-fast cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => handleImageClick(2)}
          >
            <Image
              src={uploadedImages[2] || "/image3.png"}
              alt="Valentine's image 3"
              fill
              className="rounded-full object-cover"
            />
          </div>
          {/* Bottom left image */}
          <div
            className="absolute -bottom-16 sm:-bottom-24 -left-16 sm:-left-24 w-24 sm:w-32 aspect-square floating-image-fast cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => handleImageClick(3)}
          >
            <Image
              src={uploadedImages[3] || "/image4.png"}
              alt="Valentine's image 4"
              fill
              className="rounded-full object-cover"
            />
          </div>
          {/* Bottom center image */}
          <div
            className="absolute -bottom-24 sm:-bottom-32 inset-x-0 mx-auto w-32 sm:w-40 aspect-square floating-image-slow cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => handleImageClick(4)}
          >
            <Image
              src={uploadedImages[4] || "/image5.png"}
              alt="Valentine's image 5"
              fill
              className="rounded-full object-cover"
            />
          </div>
          {/* Bottom right image */}
          <div
            className="absolute -bottom-16 sm:-bottom-24 -right-16 sm:-right-24 w-24 sm:w-32 aspect-square floating-image cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => handleImageClick(5)}
          >
            <Image
              src={uploadedImages[5] || "/image6.png"}
              alt="Valentine's image 6"
              fill
              className="rounded-full object-cover"
            />
          </div>

          <div className="text-center bg-white bg-opacity-70 rounded-3xl p-8 shadow-lg">
            <h1 className="text-4xl md:text-6xl font-bold text-red-600 mb-8 retro-text-shadow">
              Yay! Happy Valentine&apos;s Day!
            </h1>
            <p className="text-xl md:text-2xl text-red-500 mb-8 max-w-2xl mx-auto">
              Your love is the sweetest gift I could ever receive. Thank you for being my Valentine and making every day
              brighter with your presence. Here&apos;s to us and our beautiful journey together!
            </p>
            <div className="pixelated-heart mx-auto animate-bounce" />
          </div>
        </div>
      </div>
    </>
  )
}

