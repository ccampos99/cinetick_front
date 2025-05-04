"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import MovieCard from "./movie-card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Filter, SlidersHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock data for movies
const mockMovies = [
  {
    id: 1,
    title: "Oppenheimer",
    image: "/images/oppenheimer.png",
    genre: "Drama, Historia",
    duration: 180,
    rating: "13+",
    score: 9.2,
  },
  {
    id: 2,
    title: "Avatar",
    image: "/images/avatar.png",
    genre: "Ciencia Ficción, Aventura",
    duration: 162,
    rating: "13+",
    score: 8.7,
  },
  {
    id: 3,
    title: "León: El Profesional",
    image: "/images/leon-professional.png",
    genre: "Acción, Drama",
    duration: 110,
    rating: "18+",
    score: 8.5,
  },
  {
    id: 4,
    title: "Black Swan",
    image: "/images/black-swan.png",
    genre: "Drama, Thriller",
    duration: 108,
    rating: "18+",
    score: 8.0,
  },
  {
    id: 5,
    title: "El Padrino",
    image: "/images/godfather.png",
    genre: "Drama, Crimen",
    duration: 175,
    rating: "18+",
    score: 9.2,
  },
  {
    id: 6,
    title: "Joker",
    image: "/images/joker.png",
    genre: "Drama, Thriller",
    duration: 122,
    rating: "18+",
    score: 8.4,
  },
  {
    id: 7,
    title: "Dune",
    image: "/images/dune.png",
    genre: "Ciencia Ficción, Aventura",
    duration: 155,
    rating: "13+",
    score: 8.0,
  },
  {
    id: 8,
    title: "Gladiator II",
    image: "/placeholder.svg?height=400&width=300",
    genre: "Acción, Drama",
    duration: 155,
    rating: "16+",
    score: 8.8,
  },
]

export default function MovieShowcase() {
  const [movies, setMovies] = useState(mockMovies)
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [filters, setFilters] = useState({
    genres: [] as string[],
    ratings: [] as string[],
    minScore: 0,
  })
  const moviesPerPage = 4

  // Get unique genres from movies
  const allGenres = Array.from(new Set(mockMovies.flatMap((movie) => movie.genre.split(", "))))
  const allRatings = Array.from(new Set(mockMovies.map((movie) => movie.rating)))

  const handleFilterChange = (type: "genres" | "ratings", value: string) => {
    setFilters((prev) => {
      const current = [...prev[type]]
      if (current.includes(value)) {
        return { ...prev, [type]: current.filter((item) => item !== value) }
      } else {
        return { ...prev, [type]: [...current, value] }
      }
    })
    setCurrentPage(1)
  }

  const handleScoreChange = (value: number) => {
    setFilters((prev) => ({ ...prev, minScore: value }))
    setCurrentPage(1)
  }

  // Filter movies based on selected filters
  const filteredMovies = mockMovies.filter((movie) => {
    const genreMatch = filters.genres.length === 0 || filters.genres.some((genre) => movie.genre.includes(genre))

    const ratingMatch = filters.ratings.length === 0 || filters.ratings.includes(movie.rating)

    const scoreMatch = movie.score >= filters.minScore

    return genreMatch && ratingMatch && scoreMatch
  })

  const totalPages = Math.ceil(filteredMovies.length / moviesPerPage)

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  // Get current movies for pagination
  const indexOfLastMovie = currentPage * moviesPerPage
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage
  const currentMovies = filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie)

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <div>
      {/* Filters */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg text-gray-300">Mostrando {filteredMovies.length} películas</h3>

        <div className="flex space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="border-teal-500/30 hover:border-teal-500 hover:bg-teal-500/10">
                <Filter className="h-4 w-4 mr-2" />
                Géneros
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-zinc-900 border-teal-500/30">
              <DropdownMenuLabel>Filtrar por género</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-teal-500/20" />
              {allGenres.map((genre) => (
                <DropdownMenuCheckboxItem
                  key={genre}
                  checked={filters.genres.includes(genre)}
                  onCheckedChange={() => handleFilterChange("genres", genre)}
                >
                  {genre}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="border-teal-500/30 hover:border-teal-500 hover:bg-teal-500/10">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filtros
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-zinc-900 border-teal-500/30 w-56">
              <DropdownMenuLabel>Clasificación</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-teal-500/20" />
              {allRatings.map((rating) => (
                <DropdownMenuCheckboxItem
                  key={rating}
                  checked={filters.ratings.includes(rating)}
                  onCheckedChange={() => handleFilterChange("ratings", rating)}
                >
                  {rating}
                </DropdownMenuCheckboxItem>
              ))}

              <DropdownMenuSeparator className="bg-teal-500/20" />
              <DropdownMenuLabel>Puntuación mínima</DropdownMenuLabel>
              <div className="px-2 py-2">
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="0.5"
                  value={filters.minScore}
                  onChange={(e) => handleScoreChange(Number.parseFloat(e.target.value))}
                  className="w-full accent-teal-500"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>0</span>
                  <span>{filters.minScore.toFixed(1)}</span>
                  <span>10</span>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {currentMovies.length > 0 ? (
          currentMovies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
        ) : (
          <div className="col-span-4 text-center py-12 text-gray-400">
            No se encontraron películas con los filtros seleccionados.
          </div>
        )}
      </motion.div>

      {/* Pagination */}
      {filteredMovies.length > 0 && (
        <div className="flex justify-center mt-12 space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="border-teal-500/50 text-teal-400 hover:bg-teal-500/20 hover:text-white"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {Array.from({ length: totalPages }).map((_, index) => (
            <Button
              key={index}
              variant={currentPage === index + 1 ? "default" : "outline"}
              className={
                currentPage === index + 1
                  ? "bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 border-none"
                  : "border-teal-500/50 text-teal-400 hover:bg-teal-500/20 hover:text-white"
              }
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </Button>
          ))}

          <Button
            variant="outline"
            size="icon"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="border-teal-500/50 text-teal-400 hover:bg-teal-500/20 hover:text-white"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}
