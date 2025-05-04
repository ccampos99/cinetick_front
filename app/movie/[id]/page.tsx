import { notFound } from "next/navigation"
import Image from "next/image"
import MovieDetails from "@/components/movie-details"
import ShowtimeSelector from "@/components/showtime-selector"

// Mock data for movies
const mockMovies = [
  {
    id: 1,
    title: "Oppenheimer",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-gJbg91n13M0HzBElzZZOB5uaVXnQw1.png",
    genre: "Drama, Historia",
    duration: 180,
    rating: "13+",
    director: "Christopher Nolan",
    cast: ["Cillian Murphy", "Emily Blunt", "Matt Damon", "Robert Downey Jr."],
    synopsis:
      "La película sigue a J. Robert Oppenheimer, el físico teórico que dirigió el Proyecto Manhattan durante la Segunda Guerra Mundial, que llevó al desarrollo de la bomba atómica.",
    releaseDate: "21 de julio de 2023",
  },
  {
    id: 2,
    title: "Assassin's Creed",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-li3kh5YuBIzP01FJoeNnyKHWIcm6gS.png",
    genre: "Acción, Aventura",
    duration: 115,
    rating: "13+",
    director: "Justin Kurzel",
    cast: ["Michael Fassbender", "Marion Cotillard", "Jeremy Irons"],
    synopsis:
      "A través de una tecnología revolucionaria que desbloquea sus recuerdos genéticos, Callum Lynch experimenta las aventuras de su ancestro, Aguilar, en la España del siglo XV. Callum descubre que es descendiente de una misteriosa sociedad secreta, los Asesinos, y acumula conocimientos y habilidades para enfrentarse a la opresiva y poderosa organización Templaria en el presente.",
    releaseDate: "21 de diciembre de 2016",
  },
]

export default function MoviePage({ params }: { params: { id: string } }) {
  const movieId = Number.parseInt(params.id)
  const movie = mockMovies.find((m) => m.id === movieId)

  if (!movie) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-black text-white pt-16">
      {/* Hero section with movie poster */}
      <div className="relative h-[50vh] md:h-[70vh] w-full overflow-hidden">
        <Image src={movie.image || "/placeholder.svg"} alt={movie.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Movie details */}
          <div className="md:col-span-1">
            <MovieDetails movie={movie} />
          </div>

          {/* Showtimes and booking */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-6 text-red-500">Seleccionar Función</h2>
            <ShowtimeSelector movieId={movie.id} />
          </div>
        </div>
      </div>
    </main>
  )
}
