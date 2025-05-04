"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Plus, Minus, ShoppingCart, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Generate a grid of seats (10x10)
const generateSeats = () => {
  const rows = 10
  const seatsPerRow = 10
  const seats = []

  for (let row = 0; row < rows; row++) {
    for (let seat = 0; seat < seatsPerRow; seat++) {
      // Skip some seats to create a more realistic layout
      if (
        (row === 4 && seat === 0) ||
        (row === 4 && seat === 9) ||
        (row === 5 && seat === 0) ||
        (row === 5 && seat === 9)
      ) {
        continue
      }

      const seatId = row * seatsPerRow + seat + 1

      // Randomly mark some seats as occupied
      const isOccupied = Math.random() < 0.3

      seats.push({
        id: seatId,
        row: String.fromCharCode(65 + row), // A, B, C, ...
        number: seat + 1,
        isOccupied,
        type: seat >= 3 && seat <= 6 ? "premium" : "standard", // Middle seats are premium
      })
    }
  }

  return seats
}

interface SeatSelectorProps {
  selectedSeats: number[]
  onSeatSelect: (seatId: number) => void
  onAddToCart: () => void
  onBack: () => void
}

export default function SeatSelector({ selectedSeats, onSeatSelect, onAddToCart, onBack }: SeatSelectorProps) {
  const [seats, setSeats] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [hoveredSeat, setHoveredSeat] = useState<number | null>(null)

  useEffect(() => {
    // Simulate API call to get seats
    setIsLoading(true)
    setTimeout(() => {
      setSeats(generateSeats())
      setIsLoading(false)
    }, 800)
  }, [])

  const getSeatStatus = (seat: any) => {
    if (seat.isOccupied) return "occupied"
    if (selectedSeats.includes(seat.id)) return "selected"
    return "available"
  }

  const getSeatColor = (status: string, type: string) => {
    switch (status) {
      case "occupied":
        return "bg-gray-600 cursor-not-allowed"
      case "selected":
        return type === "premium"
          ? "bg-gradient-to-r from-pink-500 to-purple-600 shadow-lg shadow-purple-500/20"
          : "bg-gradient-to-r from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/20"
      default:
        return type === "premium"
          ? "bg-purple-500/20 border border-purple-500/30 hover:bg-purple-500/40"
          : "bg-white hover:bg-gray-300"
    }
  }

  const getSeatPrice = (type: string) => {
    return type === "premium" ? 20 : 15
  }

  const getTotalPrice = () => {
    let total = 0
    selectedSeats.forEach((seatId) => {
      const seat = seats.find((s) => s.id === seatId)
      if (seat) {
        total += getSeatPrice(seat.type)
      }
    })
    return total
  }

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="mr-2 text-gray-400 hover:text-white hover:bg-purple-500/20"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </motion.div>
        <h3 className="text-xl font-semibold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
          Seleccionar Asientos
        </h3>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="relative w-16 h-16">
            <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-t-purple-500 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
            <div
              className="absolute top-1 left-1 w-14 h-14 rounded-full border-4 border-t-cyan-500 border-r-transparent border-b-transparent border-l-transparent animate-spin"
              style={{ animationDirection: "reverse", animationDuration: "0.8s" }}
            ></div>
          </div>
        </div>
      ) : (
        <>
          {/* Seat map */}
          <div className="mb-8">
            {/* Screen */}
            <div className="relative mb-12">
              <motion.div
                className="h-6 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-t-full mx-auto w-3/4 flex justify-center items-center text-xs text-gray-400"
                initial={{ scaleX: 0.5, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                PANTALLA
              </motion.div>
              <motion.div
                className="h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 w-full mt-1"
                initial={{ scaleX: 0.5, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              ></motion.div>

              <motion.div
                className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-1/2 h-12 bg-gradient-to-t from-purple-500/0 via-purple-500/10 to-purple-500/0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              ></motion.div>
            </div>

            <div className="grid grid-cols-10 gap-1 max-w-md mx-auto">
              <AnimatePresence>
                {seats.map((seat) => {
                  const status = getSeatStatus(seat)
                  const isHovered = hoveredSeat === seat.id

                  return (
                    <TooltipProvider key={seat.id}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <motion.button
                            className={`w-8 h-8 rounded-t-lg ${getSeatColor(status, seat.type)} flex items-center justify-center text-xs font-medium ${status === "selected" || status === "occupied" ? "text-white" : seat.type === "premium" ? "text-purple-200" : "text-gray-900"}`}
                            disabled={seat.isOccupied}
                            onClick={() => onSeatSelect(seat.id)}
                            whileHover={{ scale: status !== "occupied" ? 1.1 : 1, y: status !== "occupied" ? -5 : 0 }}
                            whileTap={{ scale: status !== "occupied" ? 0.95 : 1 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{
                              opacity: 1,
                              y: 0,
                              boxShadow:
                                isHovered && status !== "occupied" ? "0 0 15px rgba(139, 92, 246, 0.5)" : "none",
                            }}
                            transition={{
                              duration: 0.3,
                              delay: seat.id * 0.005, // Staggered animation
                            }}
                            onMouseEnter={() => setHoveredSeat(seat.id)}
                            onMouseLeave={() => setHoveredSeat(null)}
                          >
                            {seat.row}
                            {seat.number}
                          </motion.button>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="bg-zinc-900 border-purple-500/30">
                          <div className="text-xs">
                            <div className="font-semibold">{`Asiento ${seat.row}${seat.number}`}</div>
                            <div className="text-gray-400">{seat.type === "premium" ? "Premium" : "Estándar"}</div>
                            <div>{`S/ ${getSeatPrice(seat.type).toFixed(2)}`}</div>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )
                })}
              </AnimatePresence>
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-white rounded-sm mr-2"></div>
              <span className="text-sm">Estándar</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-purple-500/20 border border-purple-500/30 rounded-sm mr-2"></div>
              <span className="text-sm">Premium</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-sm mr-2"></div>
              <span className="text-sm">Seleccionado (Estándar)</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-sm mr-2"></div>
              <span className="text-sm">Seleccionado (Premium)</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-gray-600 rounded-sm mr-2"></div>
              <span className="text-sm">Ocupado</span>
            </div>
          </div>

          {/* Ticket counter and add to cart */}
          <motion.div
            className="flex flex-col sm:flex-row justify-between items-center bg-zinc-800/50 backdrop-blur-sm p-4 rounded-lg border border-purple-500/20"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex items-center mb-4 sm:mb-0">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-purple-500/30 text-gray-300 hover:bg-purple-500/20 hover:border-purple-500"
                  onClick={() => {
                    if (selectedSeats.length > 0) {
                      onSeatSelect(selectedSeats[selectedSeats.length - 1])
                    }
                  }}
                  disabled={selectedSeats.length === 0}
                >
                  <Minus className="h-4 w-4" />
                </Button>
              </motion.div>

              <div className="mx-4 text-center">
                <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
                  {selectedSeats.length}
                </div>
                <div className="text-xs text-gray-400">Asientos</div>
              </div>

              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-purple-500/30 text-gray-300 hover:bg-purple-500/20 hover:border-purple-500"
                  onClick={() => {
                    // Find first available seat
                    const availableSeat = seats.find((seat) => !seat.isOccupied && !selectedSeats.includes(seat.id))
                    if (availableSeat && selectedSeats.length < 10) {
                      onSeatSelect(availableSeat.id)
                    }
                  }}
                  disabled={selectedSeats.length >= 10}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </motion.div>
            </div>

            <div className="flex items-center">
              <div className="mr-4 text-right">
                <div className="text-sm text-gray-400">Total</div>
                <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
                  S/ {getTotalPrice().toFixed(2)}
                </div>
              </div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white border-none"
                  onClick={onAddToCart}
                  disabled={selectedSeats.length === 0}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Agregar al Carrito
                </Button>
              </motion.div>
            </div>
          </motion.div>

          {/* Pricing info */}
          <motion.div
            className="mt-4 flex items-start gap-2 text-xs text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Info className="h-3 w-3 mt-0.5 flex-shrink-0" />
            <div>
              Los asientos Premium (centrales) tienen un costo de S/ 20.00 y los asientos Estándar tienen un costo de S/
              15.00.
            </div>
          </motion.div>
        </>
      )}
    </div>
  )
}
