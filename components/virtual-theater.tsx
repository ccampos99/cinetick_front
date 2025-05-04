"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Glasses, Smartphone, Scan, QrCode } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useAuth } from "@/lib/auth-context"

export default function VirtualTheater() {
  const [activeTab, setActiveTab] = useState<"vr" | "ar">("vr")
  const router = useRouter()
  const { user } = useAuth()

  const handleExperience = (type: "vr" | "ar") => {
    if (!user) {
      toast.error("Inicia sesión para continuar", {
        description: "Necesitas iniciar sesión para acceder a esta experiencia",
      })
      router.push("/login?redirect=/ar-experience")
      return
    }

    // In a real app, this would navigate to the VR/AR experience
    toast.success(type === "vr" ? "Experiencia VR" : "Experiencia AR", {
      description:
        type === "vr"
          ? "Preparando tu experiencia de cine virtual..."
          : "Escanea el código QR para iniciar la experiencia AR",
    })

    if (type === "ar") {
      router.push("/ar-experience")
    } else {
      router.push("/vr-theater")
    }
  }

  return (
    <div className="bg-zinc-900/50 backdrop-blur-sm rounded-lg overflow-hidden border border-teal-500/10">
      <div className="flex border-b border-teal-500/20">
        <button
          className={`flex-1 py-4 px-6 flex items-center justify-center ${
            activeTab === "vr" ? "bg-teal-500/20 text-white" : "text-gray-400 hover:bg-teal-500/10 hover:text-white"
          }`}
          onClick={() => setActiveTab("vr")}
        >
          <Glasses className="h-5 w-5 mr-2" />
          Cine Virtual (VR)
        </button>
        <button
          className={`flex-1 py-4 px-6 flex items-center justify-center ${
            activeTab === "ar" ? "bg-teal-500/20 text-white" : "text-gray-400 hover:bg-teal-500/10 hover:text-white"
          }`}
          onClick={() => setActiveTab("ar")}
        >
          <Smartphone className="h-5 w-5 mr-2" />
          Experiencia AR
        </button>
      </div>

      <div className="p-6">
        {activeTab === "vr" ? (
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-6 md:mb-0 md:pr-6">
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-500 text-transparent bg-clip-text">
                Experiencia de Cine Virtual
              </h3>
              <p className="text-gray-300 mb-4">
                Sumérgete en una experiencia de cine completamente nueva. Nuestro teatro virtual te permite:
              </p>
              <ul className="space-y-2 text-gray-400 mb-6">
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-teal-500/20 flex items-center justify-center mr-2 mt-0.5">
                    <span className="text-teal-400 text-xs">✓</span>
                  </div>
                  Elegir asientos virtuales premium con vista perfecta
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-teal-500/20 flex items-center justify-center mr-2 mt-0.5">
                    <span className="text-teal-400 text-xs">✓</span>
                  </div>
                  Ver trailers en 360° con sonido espacial
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-teal-500/20 flex items-center justify-center mr-2 mt-0.5">
                    <span className="text-teal-400 text-xs">✓</span>
                  </div>
                  Invitar amigos a tu sala privada virtual
                </li>
              </ul>
              <Button
                className="bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white border-none"
                onClick={() => handleExperience("vr")}
              >
                <Glasses className="mr-2 h-4 w-4" />
                Entrar al Cine Virtual
              </Button>
            </div>

            <div className="md:w-1/2 bg-zinc-800/50 rounded-lg overflow-hidden relative h-64">
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  initial={{ opacity: 0.5, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                    duration: 2,
                  }}
                >
                  <Glasses className="h-24 w-24 text-teal-400/50" />
                </motion.div>
              </div>
              <div className="absolute inset-0 bg-gradient-radial from-transparent to-zinc-900/90"></div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-6 md:mb-0 md:pr-6">
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-500 text-transparent bg-clip-text">
                Realidad Aumentada
              </h3>
              <p className="text-gray-300 mb-4">
                Lleva la magia del cine a tu entorno con nuestra experiencia de realidad aumentada:
              </p>
              <ul className="space-y-2 text-gray-400 mb-6">
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-teal-500/20 flex items-center justify-center mr-2 mt-0.5">
                    <span className="text-teal-400 text-xs">✓</span>
                  </div>
                  Escanea los pósters para ver trailers en AR
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-teal-500/20 flex items-center justify-center mr-2 mt-0.5">
                    <span className="text-teal-400 text-xs">✓</span>
                  </div>
                  Interactúa con personajes 3D de las películas
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-teal-500/20 flex items-center justify-center mr-2 mt-0.5">
                    <span className="text-teal-400 text-xs">✓</span>
                  </div>
                  Desbloquea contenido exclusivo y promociones
                </li>
              </ul>
              <Button
                className="bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white border-none"
                onClick={() => handleExperience("ar")}
              >
                <Scan className="mr-2 h-4 w-4" />
                Iniciar Experiencia AR
              </Button>
            </div>

            <div className="md:w-1/2 bg-zinc-800/50 rounded-lg overflow-hidden relative h-64 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0.7 }}
                animate={{ opacity: 1 }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                  duration: 1.5,
                }}
                className="p-4 bg-white rounded-lg"
              >
                <QrCode className="h-32 w-32 text-black" />
              </motion.div>
              <div className="absolute bottom-4 left-0 right-0 text-center text-sm text-gray-400">
                Escanea con la app CINETICK
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
