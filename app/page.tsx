import MovieShowcase from "@/components/movie-showcase"
import FeaturedMovie from "@/components/featured-movie"
import Navbar from "@/components/navbar"
import FloatingParticles from "@/components/floating-particles"
import { Suspense } from "react"
import TrendingMovies from "@/components/trending-movies"
import RecommendationEngine from "@/components/recommendation-engine"
import VirtualTheater from "@/components/virtual-theater"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-900 via-teal-950/10 to-zinc-900 text-white">
      <FloatingParticles />
      <Navbar />
      <FeaturedMovie />
      <div className="container mx-auto px-4 py-12 relative z-10">
        <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-500 text-transparent bg-clip-text">
          En Cartelera
        </h2>
        <Suspense fallback={<div className="h-96 flex items-center justify-center">Cargando películas...</div>}>
          <MovieShowcase />
        </Suspense>

        <div className="mt-20">
          <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-500 text-transparent bg-clip-text">
            Tendencias
          </h2>
          <TrendingMovies />
        </div>

        <div className="mt-20">
          <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-500 text-transparent bg-clip-text">
            Para Ti
          </h2>
          <RecommendationEngine />
        </div>

        <div className="mt-20 mb-20">
          <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-500 text-transparent bg-clip-text">
            Experiencia Virtual
          </h2>
          <VirtualTheater />
        </div>
      </div>
    </main>
  )
}
