"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Film, Filter, Search, ArrowUpDown, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import Navbar from "@/components/navbar"
import FloatingParticles from "@/components/floating-particles"
import MovieCard from "@/components/movie-card"

// Mock data for movies
const allMovies = [
  {
    id: 1,
    title: "Oppenheimer",
    image: "/images/oppenheimer.png",
    genre: "Drama, Historia",
    duration: 180,
    rating: "13+",
    score: 9.2,
    year: 2023,
  },
  {
    id: 2,
    title: "Avatar",
    image: "/images/avatar.png",
    genre: "Ciencia Ficción, Aventura",
    duration: 162,
    rating: "13+",
    score: 8.7,
    year: 2009,
  },
  {
    id: 3,
    title: "León: El Profesional",
    image: "/images/leon-professional.png",
    genre: "Acción, Drama",
    duration: 110,
    rating: "18+",
    score: 8.5,
    year: 1994,
  },
  {
    id: 4,
    title: "Black Swan",
    image: "/images/black-swan.png",
    genre: "Drama, Thriller",
    duration: 108,
    rating: "18+",
    score: 8.0,
    year: 2010,
  },
  {
    id: 5,
    title: "León: Versión Integral",
    image: "/images/leon.png",
    genre: "Acción, Drama",
    duration: 133,
    rating: "18+",
    score: 8.6,
    year: 1994,
  },
  {
    id: 6,
    title: "Gladiator II",
    image: "/placeholder.svg?height=400&width=300",
    genre: "Acción, Drama",
    duration: 155,
    rating: "16+",
    score: 8.8,
    year: 2024,
  },
  {
    id: 7,
    title: "Dune: Parte Dos",
    image: "/placeholder.svg?height=400&width=300",
    genre: "Ciencia Ficción",
    duration: 166,
    rating: "13+",
    score: 9.0,
    year: 2024,
  },
  {
    id: 8,
    title: "Deadpool & Wolverine",
    image: "/placeholder.svg?height=400&width=300",
    genre: "Acción, Comedia",
    duration: 127,
    rating: "18+",
    score: 8.7,
    year: 2024,
  },
]

export default function MoviesPage() {
  const [movies, setMovies] = useState(allMovies)
  const [searchTerm, setSearchTerm] = useState("")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [filters, setFilters] = useState({
    genres: [] as string[],
    ratings: [] as string[],
    minScore: 0,
    yearRange: [1990, 2024],
  })
  const [sortBy, setSortBy] = useState<"title" | "year" | "score">("score")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [isLoading, setIsLoading] = useState(true)

  // Get unique genres from movies
  const allGenres = Array.from(new Set(allMovies.flatMap((movie) => movie.genre.split(", "))))
  const allRatings = Array.from(new Set(allMovies.map((movie) => movie.rating)))
  const yearRange = [
    Math.min(...allMovies.map((movie) => movie.year)),
    Math.max(...allMovies.map((movie) => movie.year)),
  ]

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Filter and sort movies
    let filtered = allMovies.filter((movie) => {
      // Search term filter
      const matchesSearch =
        searchTerm === "" ||
        movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.genre.toLowerCase().includes(searchTerm.toLowerCase())

      // Genre filter
      const genreMatch = filters.genres.length === 0 || filters.genres.some((genre) => movie.genre.includes(genre))

      // Rating filter
      const ratingMatch = filters.ratings.length === 0 || filters.ratings.includes(movie.rating)

      // Score filter
      const scoreMatch = movie.score >= filters.minScore

      // Year filter
      const yearMatch = movie.year >= filters.yearRange[0] && movie.year <= filters.yearRange[1]

      return matchesSearch && genreMatch && ratingMatch && scoreMatch && yearMatch
    })

    // Sort movies
    filtered = filtered.sort((a, b) => {
      if (sortBy === "title") {
        return sortOrder === "asc" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
      } else if (sortBy === "year") {
        return sortOrder === "asc" ? a.year - b.year : b.year - a.year
      } else {
        // score
        return sortOrder === "asc" ? a.score - b.score : b.score - a.score
      }
    })

    setMovies(filtered)
  }, [searchTerm, filters, sortBy, sortOrder])

  const handleFilterChange = (type: "genres" | "ratings", value: string) => {
    setFilters((prev) => {
      const current = [...prev[type]]
      if (current.includes(value)) {
        return { ...prev, [type]: current.filter((item) => item !== value) }
      } else {
        return { ...prev, [type]: [...current, value] }
      }
    })
  }

  const handleScoreChange = (value: number[]) => {
    setFilters((prev) => ({ ...prev, minScore: value[0] }))
  }

  const handleYearChange = (value: number[]) => {
    setFilters((prev) => ({ ...prev, yearRange: value }))
  }

  const handleSort = (by: "title" | "year" | "score") => {
    if (sortBy === by) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(by)
      setSortOrder("desc")
    }
  }

  const resetFilters = () => {
    setFilters({
      genres: [],
      ratings: [],
      minScore: 0,
      yearRange: [yearRange[0], yearRange[1]],
    })
    setSearchTerm("")
    setSortBy("score")
    setSortOrder("desc")
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-900 via-teal-950/10 to-zinc-900 text-white">
      <FloatingParticles />
      <Navbar />

      <div className="container mx-auto px-4 pt-24 pb-12 relative z-10">
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-500 text-transparent bg-clip-text"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Películas
        </motion.h1>

        <motion.p
          className="text-xl text-gray-300 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Explora nuestro catálogo completo de películas
        </motion.p>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Buscar por título o género..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-zinc-800/50 border-teal-500/30 text-white focus-visible:ring-teal-500"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              className={`border-teal-500/30 hover:border-teal-500 hover:bg-teal-500/10 ${isFilterOpen ? "bg-teal-500/20 text-white" : "text-gray-300"}`}
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filtros
            </Button>

            <Button
              variant="outline"
              className="border-teal-500/30 hover:border-teal-500 hover:bg-teal-500/10 text-gray-300"
              onClick={resetFilters}
            >
              Limpiar
            </Button>
          </div>
        </div>

        {isFilterOpen && (
          <motion.div
            className="bg-zinc-900/70 backdrop-blur-md rounded-lg p-6 mb-8 border border-teal-500/20"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Géneros</h3>
                <div className="flex flex-wrap gap-2">
                  {allGenres.map((genre) => (
                    <Button
                      key={genre}
                      variant="outline"
                      size="sm"
                      className={`${
                        filters.genres.includes(genre)
                          ? "bg-teal-500/20 border-teal-500 text-white"
                          : "border-gray-700 text-gray-400 hover:border-teal-500 hover:bg-teal-500/10"
                      }`}
                      onClick={() => handleFilterChange("genres", genre)}
                    >
                      {genre}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Clasificación</h3>
                <div className="flex flex-wrap gap-2">
                  {allRatings.map((rating) => (
                    <Button
                      key={rating}
                      variant="outline"
                      size="sm"
                      className={`${
                        filters.ratings.includes(rating)
                          ? "bg-teal-500/20 border-teal-500 text-white"
                          : "border-gray-700 text-gray-400 hover:border-teal-500 hover:bg-teal-500/10"
                      }`}
                      onClick={() => handleFilterChange("ratings", rating)}
                    >
                      {rating}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-4">Puntuación mínima</h3>
                  <div className="px-2">
                    <Slider
                      defaultValue={[filters.minScore]}
                      max={10}
                      step={0.5}
                      onValueChange={handleScoreChange}
                      className="my-4"
                    />
                    <div className="flex justify-between text-sm text-gray-400">
                      <span>0</span>
                      <span>{filters.minScore.toFixed(1)}</span>
                      <span>10</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Año</h3>
                  <div className="px-2">
                    <Slider
                      defaultValue={filters.yearRange}
                      min={yearRange[0]}
                      max={yearRange[1]}
                      step={1}
                      onValueChange={handleYearChange}
                      className="my-4"
                    />
                    <div className="flex justify-between text-sm text-gray-400">
                      <span>{filters.yearRange[0]}</span>
                      <span>{filters.yearRange[1]}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg text-gray-300">
            {movies.length} {movies.length === 1 ? "película encontrada" : "películas encontradas"}
          </h3>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-400">Ordenar por:</span>
            <div className="flex space-x-2">
              <Button
                variant="ghost"
                size="sm"
                className={`${sortBy === "title" ? "text-teal-400" : "text-gray-400"}`}
                onClick={() => handleSort("title")}
              >
                Título
                {sortBy === "title" && <ArrowUpDown className="ml-1 h-3 w-3" />}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className={`${sortBy === "year" ? "text-teal-400" : "text-gray-400"}`}
                onClick={() => handleSort("year")}
              >
                Año
                {sortBy === "year" && <ArrowUpDown className="ml-1 h-3 w-3" />}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className={`${sortBy === "score" ? "text-teal-400" : "text-gray-400"}`}
                onClick={() => handleSort("score")}
              >
                <Star className="mr-1 h-3 w-3" />
                Puntuación
                {sortBy === "score" && <ArrowUpDown className="ml-1 h-3 w-3" />}
              </Button>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
              <div key={index} className="aspect-[2/3] bg-zinc-800/50 rounded-lg animate-pulse"></div>
            ))}
          </div>
        ) : movies.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-20">
            <Film className="h-16 w-16 mx-auto text-gray-600 mb-4" />
            <h3 className="text-xl font-bold mb-2">No se encontraron películas</h3>
            <p className="text-gray-400 mb-6">Intenta con otros filtros o términos de búsqueda</p>
            <Button
              variant="outline"
              className="border-teal-500/30 hover:border-teal-500 hover:bg-teal-500/10 text-gray-300"
              onClick={resetFilters}
            >
              Limpiar filtros
            </Button>
          </div>
        )}
      </div>
    </main>
  )
}
