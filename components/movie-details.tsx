import { Clock, Calendar, Star, User } from "lucide-react"

interface MovieDetailsProps {
  movie: {
    title: string
    genre: string
    duration: number
    rating: string
    director: string
    cast: string[]
    synopsis: string
    releaseDate: string
  }
}

export default function MovieDetails({ movie }: MovieDetailsProps) {
  return (
    <div className="bg-gray-900 rounded-lg p-6 shadow-lg">
      <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>

      <div className="flex flex-wrap gap-y-2 text-sm text-gray-300 mb-6">
        <div className="flex items-center mr-4">
          <Clock className="h-4 w-4 mr-1 text-red-500" />
          <span>{movie.duration} min</span>
        </div>
        <div className="flex items-center mr-4">
          <Calendar className="h-4 w-4 mr-1 text-red-500" />
          <span>{movie.releaseDate}</span>
        </div>
        <div className="flex items-center mr-4">
          <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">{movie.rating}</span>
        </div>
        <div className="w-full mt-2">{movie.genre}</div>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2 flex items-center">
          <User className="h-4 w-4 mr-2 text-red-500" />
          Director
        </h2>
        <p>{movie.director}</p>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2 flex items-center">
          <Star className="h-4 w-4 mr-2 text-red-500" />
          Reparto
        </h2>
        <div className="flex flex-wrap gap-2">
          {movie.cast.map((actor, index) => (
            <span key={index} className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm">
              {actor}
            </span>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">Sinopsis</h2>
        <p className="text-gray-300">{movie.synopsis}</p>
      </div>
    </div>
  )
}
