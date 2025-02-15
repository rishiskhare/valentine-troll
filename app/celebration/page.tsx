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
  const [customText, setCustomText] = useState(
    "Your love is the sweetest gift I could ever receive. Thank you for being my Valentine and making every day brighter with your presence. Here's to us and our beautiful journey together!",
  )
  const [isEditing, setIsEditing] = useState(false)
  const [customTitle, setCustomTitle] = useState("Yay! Happy Valentine's Day!")
  const [isEditingTitle, setIsEditingTitle] = useState(false)

  useEffect(() => {
    const hearts = ["❤️", "💖", "💕", "💗", "💓", "💘", "💝"]
    const newConfetti = Array(50)
      .fill(null)
      .map((_, i) => <Confetti key={i} emoji={hearts[Math.floor(Math.random() * hearts.length)]} />)
    setConfetti(newConfetti)

    // Load saved images and custom text from local storage
    const loadSavedData = () => {
      try {
        const savedImages = localStorage.getItem("valentineImages")
        if (savedImages) {
          setUploadedImages(JSON.parse(savedImages))
        }
        const savedText = localStorage.getItem("valentineCustomText")
        if (savedText) {
          setCustomText(savedText)
        }
        const savedTitle = localStorage.getItem("valentineCustomTitle")
        if (savedTitle) {
          setCustomTitle(savedTitle)
        }
      } catch (error) {
        console.error("Error loading data from local storage:", error)
      }
    }

    loadSavedData()
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

  const handleTextClick = () => {
    setIsEditing(true)
  }

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCustomText(event.target.value)
  }

  const handleTextBlur = () => {
    setIsEditing(false)
    // Save to local storage
    try {
      localStorage.setItem("valentineCustomText", customText)
    } catch (error) {
      console.error("Error saving custom text to local storage:", error)
    }
  }

  const handleTitleClick = () => {
    setIsEditingTitle(true)
  }

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCustomTitle(event.target.value)
  }

  const handleTitleBlur = () => {
    setIsEditingTitle(false)
    // Save to local storage
    try {
      localStorage.setItem("valentineCustomTitle", customTitle)
    } catch (error) {
      console.error("Error saving custom title to local storage:", error)
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
              src={uploadedImages[0]}
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
              src={uploadedImages[1]}
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
              src={uploadedImages[2]}
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
              src={uploadedImages[3]}
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
              src={uploadedImages[4]}
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
              src={uploadedImages[5]}
              alt="Valentine's image 6"
              fill
              className="rounded-full object-cover"
            />
          </div>

          <div className="text-center bg-white bg-opacity-70 rounded-3xl p-8 shadow-lg">
            {isEditingTitle ? (
              <input
                value={customTitle}
                onChange={handleTitleChange}
                onBlur={handleTitleBlur}
                className="w-full p-2 text-4xl md:text-6xl font-bold text-red-600 mb-8 bg-transparent border-2 border-red-300 rounded-lg focus:outline-none focus:border-red-500 text-center"
                autoFocus
              />
            ) : (
              <h1
                className="text-4xl md:text-6xl font-bold text-red-600 mb-8 retro-text-shadow cursor-pointer hover:bg-red-100 rounded-lg p-2 transition-colors duration-200"
                onClick={handleTitleClick}
              >
                {customTitle}
              </h1>
            )}
            {isEditing ? (
              <textarea
                value={customText}
                onChange={handleTextChange}
                onBlur={handleTextBlur}
                className="w-full p-2 text-xl md:text-2xl text-red-500 bg-transparent border-2 border-red-300 rounded-lg focus:outline-none focus:border-red-500"
                rows={5}
                autoFocus
              />
            ) : (
              <p
                className="text-xl md:text-2xl text-red-500 mb-8 max-w-2xl mx-auto cursor-pointer hover:bg-red-100 rounded-lg p-2 transition-colors duration-200"
                onClick={handleTextClick}
              >
                {customText}
              </p>
            )}
            <div className="pixelated-heart mx-auto animate-bounce" />
          </div>
        </div>
      </div>
    </>
  )
}

