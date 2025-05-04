"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { format, addDays } from "date-fns"
import { es } from "date-fns/locale"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, AlertTriangle } from "lucide-react"
import { toast } from "sonner"
import SeatSelector from "./seat-selector"
import { motion, AnimatePresence } from "framer-motion"
import { useAuth } from "@/lib/auth-context"

// Mock data for showtimes
const mockShowtimes = [
  { id: 1, time: "16:30", theater: "Sala 5", format: "Regular 2D" },
  { id: 2, time: "18:30", theater: "Sala 6", format: "Regular 2D" },
  { id: 3, time: "20:30", theater: "Sala 5", format: "Regular 3D" },
  { id: 4, time: "22:30", theater: "Sala 4", format: "Regular 3D" },
  { id: 5, time: "22:30", theater: "Sala 7", format: "IMAX" },
]

interface ShowtimeSelectorProps {
  movieId: number
}

export default function ShowtimeSelector({ movieId }: ShowtimeSelectorProps) {
  const router = useRouter()
  const today = new Date()
  const { user } = useAuth()

  const [selectedDate, setSelectedDate] = useState(today)
  const [selectedShowtime, setSelectedShowtime] = useState<number | null>(null)
  const [selectedSeats, setSelectedSeats] = useState<number[]>([])
  const [step, setStep] = useState(1) // 1: Date & Time, 2: Seats

  // Generate dates for the next 7 days
  const dates = Array.from({ length: 7 }, (_, i) => addDays(today, i))

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
  }

  const handleShowtimeSelect = (showtimeId: number) => {
    setSelectedShowtime(showtimeId)
  }

  const handleContinue = () => {
    if (!user) {
      toast("Inicia sesión para continuar", {
        description: "Necesitas iniciar sesión para comprar entradas",
      })
      router.push("/login?redirect=/movie/" + movieId)
      return
    }

    if (!selectedShowtime) {
      toast("Selección incompleta", {
        description: "Por favor selecciona un horario para continuar.",
      })
      return
    }

    setStep(2)
  }

  const handleSeatSelection = (seatId: number) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((id) => id !== seatId))
    } else {
      if (selectedSeats.length < 10) {
        setSelectedSeats([...selectedSeats, seatId])
      } else {
        toast("Límite alcanzado", {
          description: "Puedes seleccionar un máximo de 10 asientos por compra.",
        })
      }
    }
  }

  const handleAddToCart = () => {
    if (selectedSeats.length === 0) {
      toast("Selección incompleta", {
        description: "Por favor selecciona al menos un asiento para continuar.",
      })
      return
    }

    // In a real app, you would add to cart via API
    toast("¡Agregado al carrito!", {
      description: `${selectedSeats.length} asientos para la función de ${mockShowtimes.find((s) => s.id === selectedShowtime)?.time}`,
    })

    // Navigate to cart page
    // router.push('/cart')
  }

  const handleBack = () => {
    setStep(1)
  }

  return (
    <div className="bg-zinc-900/70 backdrop-blur-md rounded-lg shadow-lg overflow-hidden border border-purple-500/20">
      <AnimatePresence mode="wait">
        {step === 1 ? (
          <motion.div
            key="step1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-6"
          >
            {/* Date selection */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-purple-400" />
                Fecha
              </h3>
              <div className="grid grid-cols-7 gap-2">
                {dates.map((date, index) => {
                  const isSelected = date.toDateString() === selectedDate.toDateString()
                  const dayName = format(date, "EEE", { locale: es })
                  const dayNumber = format(date, "d")

                  return (
                    <motion.div key={index} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        variant={isSelected ? "default" : "outline"}
                        className={`flex flex-col items-center p-2 h-auto ${
                          isSelected
                            ? "bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 border-none"
                            : "border-purple-500/30 hover:border-purple-500 hover:bg-purple-500/20"
                        }`}
                        onClick={() => handleDateSelect(date)}
                      >
                        <span className="text-xs uppercase">{dayName}</span>
                        <span className="text-lg font-bold">{dayNumber}</span>
                      </Button>
                    </motion.div>
                  )
                })}
              </div>
            </div>

            {/* Time selection */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Clock className="h-4 w-4 mr-2 text-purple-400" />
                Horario
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {mockShowtimes.map((showtime) => (
                  <motion.div key={showtime.id} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant={selectedShowtime === showtime.id ? "default" : "outline"}
                      className={`flex flex-col items-center p-3 h-auto ${
                        selectedShowtime === showtime.id
                          ? "bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 border-none"
                          : "border-purple-500/30 hover:border-purple-500 hover:bg-purple-500/20"
                      }`}
                      onClick={() => handleShowtimeSelect(showtime.id)}
                    >
                      <span className="text-lg font-bold">{showtime.time}</span>
                      <span className="text-xs">{showtime.theater}</span>
                      <span className="text-xs mt-1">{showtime.format}</span>
                    </Button>
                  </motion.div>
                ))}
              </div>
            </div>

            {!user && (
              <motion.div
                className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-red-400">Inicia sesión para continuar</h4>
                  <p className="text-sm text-gray-400">Necesitas iniciar sesión para poder comprar entradas</p>
                </div>
              </motion.div>
            )}

            <div className="flex justify-end">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white border-none"
                  onClick={handleContinue}
                >
                  Continuar
                </Button>
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <motion.div key="step2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <SeatSelector
              selectedSeats={selectedSeats}
              onSeatSelect={handleSeatSelection}
              onAddToCart={handleAddToCart}
              onBack={handleBack}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
