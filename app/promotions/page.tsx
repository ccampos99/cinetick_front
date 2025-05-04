"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Calendar, Users, Gift, QrCode, Clock, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import Navbar from "@/components/navbar"
import FloatingParticles from "@/components/floating-particles"
import { useAuth } from "@/lib/auth-context"
import { toast } from "sonner"
import Image from "next/image"

// Mock data for promotions
const promotions = [
  {
    id: 1,
    title: "2x1 en entradas",
    description: "Compra una entrada y lleva otra gratis para cualquier película de lunes a jueves.",
    image: "/placeholder.svg?height=300&width=600",
    validUntil: "2025-06-30",
    code: "CINETICK2X1",
    isExclusive: false,
  },
  {
    id: 2,
    title: "Combo familiar",
    description: "4 entradas + 2 combos grandes de palomitas y bebidas con 30% de descuento.",
    image: "/placeholder.svg?height=300&width=600",
    validUntil: "2025-06-15",
    code: "FAMCINETICK",
    isExclusive: true,
  },
  {
    id: 3,
    title: "Noche de estrenos",
    description: "Acceso exclusivo a pre-estrenos con 20% de descuento en combos.",
    image: "/placeholder.svg?height=300&width=600",
    validUntil: "2025-07-31",
    code: "PREESTRENO",
    isExclusive: true,
  },
  {
    id: 4,
    title: "Descuento estudiantes",
    description: "50% de descuento en entradas presentando carnet estudiantil.",
    image: "/placeholder.svg?height=300&width=600",
    validUntil: "2025-12-31",
    code: "ESTUDIANTE",
    isExclusive: false,
  },
]

export default function PromotionsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [activePromotion, setActivePromotion] = useState<number | null>(null)
  const router = useRouter()
  const { user } = useAuth()

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const handleClaimPromotion = (id: number) => {
    if (!user) {
      toast.error("Inicia sesión para continuar", {
        description: "Necesitas iniciar sesión para reclamar promociones",
      })
      router.push("/login?redirect=/promotions")
      return
    }

    const promo = promotions.find((p) => p.id === id)
    if (promo) {
      toast.success("¡Promoción reclamada!", {
        description: `Has reclamado la promoción "${promo.title}". Usa el código ${promo.code} al comprar tus entradas.`,
      })
    }
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
          Promociones
        </motion.h1>

        <motion.p
          className="text-xl text-gray-300 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Descubre nuestras ofertas especiales y ahorra en tu próxima visita
        </motion.p>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((_, index) => (
              <div key={index} className="h-64 bg-zinc-800/50 rounded-lg animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {promotions.map((promo, index) => (
              <motion.div
                key={promo.id}
                className={`bg-zinc-900/50 backdrop-blur-sm rounded-lg overflow-hidden border ${
                  activePromotion === promo.id ? "border-teal-500" : "border-teal-500/10 hover:border-teal-500/30"
                } transition-all duration-300`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                onClick={() => setActivePromotion(promo.id === activePromotion ? null : promo.id)}
              >
                <div className="relative h-48">
                  <Image src={promo.image || "/placeholder.svg"} alt={promo.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-transparent"></div>

                  {promo.isExclusive && (
                    <div className="absolute top-2 right-2 bg-teal-500 text-white text-xs font-bold px-2 py-1 rounded">
                      EXCLUSIVO
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-2">{promo.title}</h2>
                  <p className="text-gray-300 mb-4">{promo.description}</p>

                  <div className="flex items-center text-sm text-gray-400 mb-4">
                    <Calendar className="h-4 w-4 mr-1 text-teal-400" />
                    <span>Válido hasta: {new Date(promo.validUntil).toLocaleDateString()}</span>
                  </div>

                  {activePromotion === promo.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mb-4"
                    >
                      <div className="bg-zinc-800/70 p-4 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">Código promocional:</span>
                          <span className="font-mono bg-teal-500/20 text-teal-300 px-2 py-1 rounded">{promo.code}</span>
                        </div>

                        <div className="flex justify-center mt-4">
                          <div className="p-3 bg-white rounded-lg">
                            <QrCode className="h-24 w-24 text-black" />
                          </div>
                        </div>

                        <p className="text-center text-xs text-gray-400 mt-2">Escanea este código en taquilla</p>
                      </div>
                    </motion.div>
                  )}

                  <Button
                    className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white border-none"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleClaimPromotion(promo.id)
                    }}
                  >
                    {activePromotion === promo.id ? (
                      <>
                        <Gift className="mr-2 h-4 w-4" />
                        Reclamar promoción
                      </>
                    ) : (
                      <>
                        <ArrowRight className="mr-2 h-4 w-4" />
                        Ver detalles
                      </>
                    )}
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <div className="mt-16 bg-zinc-900/50 backdrop-blur-sm rounded-lg overflow-hidden border border-teal-500/10 p-6">
          <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-500 text-transparent bg-clip-text">
            Beneficios exclusivos
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-zinc-800/50 p-5 rounded-lg">
              <div className="bg-teal-500/20 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-teal-400" />
              </div>
              <h3 className="text-lg font-bold mb-2">Cumpleaños</h3>
              <p className="text-gray-400">Entrada gratis el día de tu cumpleaños presentando tu DNI.</p>
            </div>

            <div className="bg-zinc-800/50 p-5 rounded-lg">
              <div className="bg-teal-500/20 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-teal-400" />
              </div>
              <h3 className="text-lg font-bold mb-2">Grupos</h3>
              <p className="text-gray-400">Descuentos especiales para grupos de más de 10 personas.</p>
            </div>

            <div className="bg-zinc-800/50 p-5 rounded-lg">
              <div className="bg-teal-500/20 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-teal-400" />
              </div>
              <h3 className="text-lg font-bold mb-2">Happy Hour</h3>
              <p className="text-gray-400">Lunes a miércoles de 14:00 a 17:00, todas las entradas a mitad de precio.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
