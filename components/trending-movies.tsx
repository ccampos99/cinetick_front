"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, TrendingUp, Star } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

// Mock data for trending movies
const trendingMovies = [
  {
    id: 1,
    title: "Oppenheimer",
    image: "/images/oppenheimer.png",
    trend: "+125%",
    score: 9.2,
  },
  {
    id: 2,
    title: "Avatar",
    image: "/images/avatar.png",
    trend: "+87%",
    score: 8.7,
  },
  {
    id: 3,
    title: "León: El Profesional",
    image: "/images/leon-professional.png",
    trend: "+65%",
    score: 8.5,
  },
  {
    id: 4,
    title: "Black Swan",
    image: "/images/black-swan.png",
    trend: "+42%",
    score: 8.0,
  },
  {
    id: 5,
    title: "León: Versión Integral",
    image: "/images/leon.png",
    trend: "+38%",
    score: 8.6,
  },
]

export default function TrendingMovies() {
  const [startIndex, setStartIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const handlePrev = () => {
    setStartIndex(Math.max(0, startIndex - 1))
  }

  const handleNext = () => {
    setStartIndex(Math.min(trendingMovies.length - 3, startIndex + 1))
  }

  const visibleMovies = trendingMovies.slice(startIndex, startIndex + 3)

  return (
    <div className="relative">
      <div className="absolute -top-12 right-0 flex space-x-2">
        <Button
          variant="outline"
          size="icon"
          onClick={handlePrev}
          disabled={startIndex === 0}
          className="border-teal-500/50 text-teal-400 hover:bg-teal-500/20 hover:text-white"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={handleNext}
          disabled={startIndex >= trendingMovies.length - 3}
          className="border-teal-500/50 text-teal-400 hover:bg-teal-500/20 hover:text-white"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div ref={containerRef} className="overflow-hidden">
        <div className="flex space-x-6">
          {visibleMovies.map((movie, index) => (
            <motion.div
              key={movie.id}
              className="flex-1 bg-zinc-900/50 backdrop-blur-sm rounded-lg overflow-hidden border border-teal-500/10 hover:border-teal-500/30 transition-all duration-300"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              onClick={() => router.push(`/movie/${movie.id}`)}
            >
              <div className="relative aspect-video">
                <Image src={movie.image || "/placeholder.svg"} alt={movie.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-transparent"></div>

                <div className="absolute top-2 right-2 bg-teal-500/80 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {movie.trend}
                </div>

                <div className="absolute top-2 left-2 bg-black/50 backdrop-blur-sm text-yellow-400 text-xs font-bold px-2 py-1 rounded-full flex items-center">
                  <Star className="h-3 w-3 fill-yellow-400 mr-1" />
                  {movie.score}
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-bold text-lg">{movie.title}</h3>
                <p className="text-sm text-gray-400 mt-1">Tendencia en aumento</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
