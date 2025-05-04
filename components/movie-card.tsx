"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Clock, Calendar, Star, Heart, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import { toast } from "sonner"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface MovieCardProps {
  movie: {
    id: number
    title: string
    image: string
    genre: string
    duration: number
    rating: string
    score?: number
  }
}

export default function MovieCard({ movie }: MovieCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const router = useRouter()
  const { user } = useAuth()

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  const handleBuyTickets = () => {
    if (!user) {
      toast("Inicia sesión para continuar", {
        description: "Necesitas iniciar sesión para comprar entradas",
      })
      router.push(`/login?redirect=/movie/${movie.id}`)
    } else {
      router.push(`/movie/${movie.id}`)
    }
  }

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsFavorite(!isFavorite)
    toast(isFavorite ? "Eliminado de favoritos" : "Añadido a favoritos", {
      description: `${movie.title} ha sido ${isFavorite ? "eliminado de" : "añadido a"} tu lista de favoritos`,
    })
  }

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation()
    // In a real app, this would use the Web Share API
    toast("Compartir película", {
      description: `Enlace de ${movie.title} copiado al portapapeles`,
    })
  }

  return (
    <motion.div
      className="relative group overflow-hidden rounded-lg bg-zinc-900/50 backdrop-blur-sm shadow-lg border border-teal-500/10 hover:border-teal-500/30 transition-all duration-300"
      variants={item}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
    >
      <div className="aspect-[2/3] relative overflow-hidden">
        <Image
          src={movie.image || "/placeholder.svg"}
          alt={movie.title}
          fill
          className={`object-cover transition-transform duration-500 ${isHovered ? "scale-110" : "scale-100"}`}
        />
        <div
          className={`absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/70 to-transparent opacity-80 transition-opacity duration-300 ${isHovered ? "opacity-90" : ""}`}
        ></div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <h3 className="text-xl font-bold mb-2">{movie.title}</h3>

        <div className="flex items-center text-sm text-gray-300 mb-3">
          <Clock className="h-3 w-3 mr-1 text-teal-400" />
          <span>{movie.duration} min</span>
          <span className="mx-2 text-teal-500">|</span>
          <span>{movie.genre}</span>
        </div>

        <div
          className={`transition-all duration-300 ${isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <Button
            className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white border-none"
            onClick={handleBuyTickets}
          >
            <Calendar className="mr-2 h-4 w-4" /> Comprar Entradas
          </Button>
        </div>
      </div>

      {/* Rating badge */}
      <div className="absolute top-2 right-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-xs font-bold px-2 py-1 rounded">
        {movie.rating}
      </div>

      {/* Score badge */}
      {movie.score && (
        <div className="absolute top-2 left-2 bg-black/50 backdrop-blur-sm text-yellow-400 text-xs font-bold px-2 py-1 rounded-full flex items-center">
          <Star className="h-3 w-3 fill-yellow-400 mr-1" />
          {movie.score}
        </div>
      )}

      {/* Action buttons */}
      <div className="absolute top-12 right-2 flex flex-col space-y-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.button
                className={`p-2 rounded-full backdrop-blur-sm ${
                  isFavorite ? "bg-red-500/20 text-red-400" : "bg-black/50 text-gray-400 hover:text-white"
                }`}
                onClick={toggleFavorite}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Heart className={`h-4 w-4 ${isFavorite ? "fill-red-400" : ""}`} />
              </motion.button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>{isFavorite ? "Quitar de favoritos" : "Añadir a favoritos"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.button
                className="p-2 rounded-full bg-black/50 backdrop-blur-sm text-gray-400 hover:text-white"
                onClick={handleShare}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Share2 className="h-4 w-4" />
              </motion.button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>Compartir</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </motion.div>
  )
}
