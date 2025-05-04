"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Sparkles, ThumbsUp, ThumbsDown } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { toast } from "sonner"

// Mock data for recommended movies
const recommendedMovies = [
  {
    id: 3,
    title: "León: El Profesional",
    image: "/images/leon-professional.png",
    matchPercentage: 95,
    reason: "Basado en tus gustos de acción y drama",
  },
  {
    id: 4,
    title: "Black Swan",
    image: "/images/black-swan.png",
    matchPercentage: 87,
    reason: "Porque te gustan los thrillers psicológicos",
  },
  {
    id: 2,
    title: "Avatar",
    image: "/images/avatar.png",
    matchPercentage: 82,
    reason: "Basado en tu interés por la ciencia ficción",
  },
]

export default function RecommendationEngine() {
  const [recommendations, setRecommendations] = useState(recommendedMovies)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { user } = useAuth()

  const handleFeedback = (movieId: number, isPositive: boolean) => {
    if (!user) {
      toast.error("Inicia sesión para continuar", {
        description: "Necesitas iniciar sesión para personalizar tus recomendaciones",
      })
      return
    }

    // In a real app, this would send feedback to the recommendation engine
    toast.success(isPositive ? "¡Gracias por tu feedback!" : "Entendido", {
      description: isPositive
        ? "Mejoraremos tus recomendaciones basadas en este feedback"
        : "No te mostraremos películas similares en el futuro",
    })

    // Remove the movie from recommendations if feedback is negative
    if (!isPositive) {
      setRecommendations(recommendations.filter((movie) => movie.id !== movieId))
    }
  }

  const handleRefreshRecommendations = () => {
    if (!user) {
      toast.error("Inicia sesión para continuar", {
        description: "Necesitas iniciar sesión para personalizar tus recomendaciones",
      })
      return
    }

    setIsLoading(true)

    // Simulate API call to get new recommendations
    setTimeout(() => {
      // Shuffle the recommendations
      const shuffled = [...recommendedMovies].sort(() => 0.5 - Math.random())
      setRecommendations(shuffled)
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="relative">
      <div className="absolute -top-12 right-0">
        <Button
          variant="outline"
          className="border-teal-500/50 text-teal-400 hover:bg-teal-500/20 hover:text-white"
          onClick={handleRefreshRecommendations}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <div className="animate-spin mr-2 h-4 w-4 border-2 border-teal-500 border-t-transparent rounded-full"></div>
              Actualizando...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Actualizar recomendaciones
            </>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {recommendations.map((movie, index) => (
          <motion.div
            key={movie.id}
            className="bg-zinc-900/50 backdrop-blur-sm rounded-lg overflow-hidden border border-teal-500/10 hover:border-teal-500/30 transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <div className="relative aspect-video cursor-pointer" onClick={() => router.push(`/movie/${movie.id}`)}>
              <Image src={movie.image || "/placeholder.svg"} alt={movie.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-transparent"></div>

              <div className="absolute top-2 right-2 bg-teal-500/80 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center">
                <Sparkles className="h-3 w-3 mr-1" />
                {movie.matchPercentage}% match
              </div>
            </div>

            <div className="p-4">
              <h3 className="font-bold text-lg">{movie.title}</h3>
              <p className="text-sm text-gray-400 mt-1">{movie.reason}</p>

              <div className="flex justify-between mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-green-500/30 text-green-400 hover:bg-green-500/20 hover:text-white"
                  onClick={() => handleFeedback(movie.id, true)}
                >
                  <ThumbsUp className="h-4 w-4 mr-1" />
                  Me gusta
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  className="border-red-500/30 text-red-400 hover:bg-red-500/20 hover:text-white"
                  onClick={() => handleFeedback(movie.id, false)}
                >
                  <ThumbsDown className="h-4 w-4 mr-1" />
                  No me interesa
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {recommendations.length === 0 && (
        <div className="bg-zinc-900/50 backdrop-blur-sm rounded-lg p-8 text-center border border-teal-500/10">
          <Sparkles className="h-12 w-12 mx-auto text-teal-400 mb-4" />
          <h3 className="text-xl font-bold mb-2">Sin recomendaciones disponibles</h3>
          <p className="text-gray-400 mb-4">
            Hemos tomado en cuenta tu feedback. Estamos trabajando en nuevas recomendaciones para ti.
          </p>
          <Button
            className="bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white border-none"
            onClick={handleRefreshRecommendations}
          >
            Actualizar recomendaciones
          </Button>
        </div>
      )}
    </div>
  )
}
