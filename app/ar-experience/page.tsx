"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Smartphone, ArrowLeft, Scan, QrCode, Film, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import Navbar from "@/components/navbar"
import FloatingParticles from "@/components/floating-particles"
import Image from "next/image"

export default function ARExperiencePage() {
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-900 via-teal-950/10 to-zinc-900 text-white">
      <FloatingParticles />
      <Navbar />

      <div className="container mx-auto px-4 pt-24 pb-12 relative z-10">
        <Button variant="ghost" className="mb-6 text-gray-400 hover:text-white" onClick={() => router.push("/")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver al inicio
        </Button>

        <div className="max-w-4xl mx-auto">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-500 text-transparent bg-clip-text"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Experiencia de Realidad Aumentada
          </motion.h1>

          <motion.p
            className="text-xl text-gray-300 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Lleva la magia del cine a tu mundo real con nuestra tecnología AR
          </motion.p>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="mb-6"
              >
                <Scan className="h-16 w-16 text-teal-400" />
              </motion.div>
              <p className="text-gray-400">Preparando experiencia AR...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                className="bg-zinc-900/50 backdrop-blur-sm rounded-lg overflow-hidden border border-teal-500/10 p-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <Smartphone className="h-5 w-5 mr-2 text-teal-400" />
                  Cómo funciona
                </h2>

                <ol className="space-y-4 text-gray-300">
                  <li className="flex">
                    <span className="bg-teal-500/20 text-teal-400 h-6 w-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      1
                    </span>
                    <div>
                      <p className="font-medium">Descarga la app CINETICK</p>
                      <p className="text-sm text-gray-400 mt-1">Disponible para iOS y Android</p>
                    </div>
                  </li>
                  <li className="flex">
                    <span className="bg-teal-500/20 text-teal-400 h-6 w-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      2
                    </span>
                    <div>
                      <p className="font-medium">Escanea el código QR</p>
                      <p className="text-sm text-gray-400 mt-1">
                        Usa la app para escanear el código y activar la experiencia
                      </p>
                    </div>
                  </li>
                  <li className="flex">
                    <span className="bg-teal-500/20 text-teal-400 h-6 w-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      3
                    </span>
                    <div>
                      <p className="font-medium">Apunta tu cámara al póster</p>
                      <p className="text-sm text-gray-400 mt-1">Los pósters cobrarán vida con contenido exclusivo</p>
                    </div>
                  </li>
                </ol>

                <div className="mt-8 flex justify-center">
                  <div className="p-4 bg-white rounded-lg">
                    <QrCode className="h-32 w-32 text-black" />
                  </div>
                </div>

                <p className="text-center text-sm text-gray-400 mt-4">Escanea este código para descargar la app</p>
              </motion.div>

              <motion.div
                className="bg-zinc-900/50 backdrop-blur-sm rounded-lg overflow-hidden border border-teal-500/10 p-6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <Film className="h-5 w-5 mr-2 text-teal-400" />
                  Películas con experiencia AR
                </h2>

                <div className="space-y-4">
                  <div className="flex items-center p-3 bg-zinc-800/50 rounded-lg hover:bg-teal-500/10 transition-colors cursor-pointer">
                    <div className="relative h-16 w-12 mr-4 flex-shrink-0">
                      <Image src="/images/avatar.png" alt="Avatar" fill className="object-cover rounded" />
                    </div>
                    <div>
                      <h3 className="font-medium">Avatar</h3>
                      <p className="text-sm text-gray-400">Explora el mundo de Pandora en AR</p>
                    </div>
                    <Sparkles className="ml-auto h-5 w-5 text-teal-400" />
                  </div>

                  <div className="flex items-center p-3 bg-zinc-800/50 rounded-lg hover:bg-teal-500/10 transition-colors cursor-pointer">
                    <div className="relative h-16 w-12 mr-4 flex-shrink-0">
                      <Image src="/images/oppenheimer.png" alt="Oppenheimer" fill className="object-cover rounded" />
                    </div>
                    <div>
                      <h3 className="font-medium">Oppenheimer</h3>
                      <p className="text-sm text-gray-400">Visualiza la física cuántica en 3D</p>
                    </div>
                    <Sparkles className="ml-auto h-5 w-5 text-teal-400" />
                  </div>

                  <div className="flex items-center p-3 bg-zinc-800/50 rounded-lg hover:bg-teal-500/10 transition-colors cursor-pointer">
                    <div className="relative h-16 w-12 mr-4 flex-shrink-0">
                      <Image src="/images/black-swan.png" alt="Black Swan" fill className="object-cover rounded" />
                    </div>
                    <div>
                      <h3 className="font-medium">Black Swan</h3>
                      <p className="text-sm text-gray-400">Efectos visuales de transformación</p>
                    </div>
                    <Sparkles className="ml-auto h-5 w-5 text-teal-400" />
                  </div>

                  <div className="flex items-center p-3 bg-zinc-800/50 rounded-lg hover:bg-teal-500/10 transition-colors cursor-pointer">
                    <div className="relative h-16 w-12 mr-4 flex-shrink-0">
                      <Image
                        src="/images/leon-professional.png"
                        alt="León: El Profesional"
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">León: El Profesional</h3>
                      <p className="text-sm text-gray-400">Escenas interactivas en AR</p>
                    </div>
                    <Sparkles className="ml-auto h-5 w-5 text-teal-400" />
                  </div>
                </div>

                <div className="mt-6">
                  <Button className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white border-none">
                    <Scan className="mr-2 h-4 w-4" />
                    Iniciar Experiencia AR
                  </Button>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
