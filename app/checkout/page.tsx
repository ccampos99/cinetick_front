"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter, useSearchParams } from "next/navigation"
import { CreditCard, User, CheckCircle, ArrowLeft, Ticket, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import Navbar from "@/components/navbar"
import FloatingParticles from "@/components/floating-particles"
import { useAuth } from "@/lib/auth-context"
import { api } from "@/lib/api"

export default function CheckoutPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [step, setStep] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState<"card" | "paypal">("card")
  const [cardInfo, setCardInfo] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  })

  // Get purchase details from URL params
  const functionId = searchParams.get("functionId") ? Number.parseInt(searchParams.get("functionId") || "0") : 0
  const seatsParam = searchParams.get("seats")
  const seats = seatsParam ? seatsParam.split(",").map(Number) : []
  const total = searchParams.get("total") ? Number.parseFloat(searchParams.get("total") || "0") : 0
  const movieTitle = searchParams.get("title") || "Película"
  const showtime = searchParams.get("showtime") || "Fecha y hora"
  const theater = searchParams.get("theater") || "Sala"

  useEffect(() => {
    if (!user) {
      toast("Inicia sesión para continuar", {
        description: "Necesitas iniciar sesión para completar la compra",
      })
      router.push("/login?redirect=/checkout")
    }

    if (!functionId || !seats.length || !total) {
      toast("Información incompleta", {
        description: "No se pudo cargar la información de la compra",
      })
      router.push("/")
    }
  }, [user, functionId, seats, total, router])

  const handleCardInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    // Format card number with spaces
    if (name === "cardNumber") {
      const formatted = value
        .replace(/\s/g, "")
        .replace(/(\d{4})/g, "$1 ")
        .trim()
      setCardInfo({ ...cardInfo, [name]: formatted.substring(0, 19) })
      return
    }

    // Format expiry date
    if (name === "expiryDate") {
      const formatted = value.replace(/\D/g, "").replace(/(\d{2})(\d{0,2})/, "$1/$2")
      setCardInfo({ ...cardInfo, [name]: formatted.substring(0, 5) })
      return
    }

    setCardInfo({ ...cardInfo, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (step === 1) {
      setStep(2)
      return
    }

    // Validate card info
    if (paymentMethod === "card") {
      if (!cardInfo.cardNumber || !cardInfo.cardName || !cardInfo.expiryDate || !cardInfo.cvv) {
        toast("Información incompleta", {
          description: "Por favor completa todos los campos de la tarjeta",
        })
        return
      }

      if (cardInfo.cardNumber.replace(/\s/g, "").length !== 16) {
        toast("Número de tarjeta inválido", {
          description: "El número de tarjeta debe tener 16 dígitos",
        })
        return
      }

      if (cardInfo.cvv.length !== 3) {
        toast("CVV inválido", {
          description: "El CVV debe tener 3 dígitos",
        })
        return
      }
    }

    setIsLoading(true)

    try {
      // Create purchase using the API
      if (user) {
        const compra = {
          idUsuario: user.idUsuario,
          total: total,
          detallesCompra: [
            {
              idFuncion: functionId,
              cantidad: seats.length,
              subtotal: total,
            },
          ],
        }

        const response = await api.createCompra(compra)

        if (response.success) {
          // Simulate payment processing
          setTimeout(() => {
            setIsLoading(false)
            setIsSuccess(true)

            // Redirect to success page after 2 seconds
            setTimeout(() => {
              router.push(`/checkout/success?id=${response.idCompra}`)
            }, 2000)
          }, 2000)
        } else {
          throw new Error("Error al procesar la compra")
        }
      }
    } catch (error) {
      setIsLoading(false)
      toast("Error al procesar el pago", {
        description: "Ha ocurrido un error al procesar tu pago. Inténtalo de nuevo.",
      })
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-900 via-teal-950/10 to-zinc-900 text-white">
      <FloatingParticles />
      <Navbar />

      <div className="container mx-auto px-4 pt-24 pb-12 relative z-10">
        <Button variant="ghost" className="mb-6 text-gray-400 hover:text-white" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver
        </Button>

        <div className="max-w-4xl mx-auto">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-500 text-transparent bg-clip-text"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Finalizar Compra
          </motion.h1>

          <motion.div
            className="bg-zinc-900/50 backdrop-blur-sm rounded-lg overflow-hidden border border-teal-500/10 p-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-xl font-bold mb-4">Resumen de la Compra</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-teal-500/10">
                <div className="flex items-center">
                  <Ticket className="h-5 w-5 mr-2 text-teal-400" />
                  <span>Película:</span>
                </div>
                <span className="font-medium">{movieTitle}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-teal-500/10">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-teal-400" />
                  <span>Función:</span>
                </div>
                <span className="font-medium">{showtime}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-teal-500/10">
                <div className="flex items-center">
                  <span>Sala:</span>
                </div>
                <span className="font-medium">{theater}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-teal-500/10">
                <div className="flex items-center">
                  <span>Asientos:</span>
                </div>
                <span className="font-medium">{seats && seats.length > 0 ? seats.join(", ") : "Ninguno"}</span>
              </div>
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total:</span>
                <span className="text-teal-400">S/ {total.toFixed(2)}</span>
              </div>
            </div>
          </motion.div>

          {isSuccess ? (
            <motion.div
              className="bg-zinc-900/50 backdrop-blur-sm rounded-lg overflow-hidden border border-teal-500/10 p-8 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <CheckCircle className="h-16 w-16 text-teal-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">¡Pago Exitoso!</h2>
              <p className="text-gray-300 mb-4">Tu compra ha sido procesada correctamente.</p>
              <p className="text-gray-400">Redirigiendo...</p>
            </motion.div>
          ) : (
            <motion.div
              className="bg-zinc-900/50 backdrop-blur-sm rounded-lg overflow-hidden border border-teal-500/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="flex border-b border-teal-500/20">
                <button
                  className={`flex-1 py-4 px-6 flex items-center justify-center ${
                    step === 1 ? "bg-teal-500/20 text-white" : "text-gray-400"
                  }`}
                >
                  <span className="bg-teal-500/20 text-teal-400 h-6 w-6 rounded-full flex items-center justify-center mr-2">
                    1
                  </span>
                  Método de Pago
                </button>
                <button
                  className={`flex-1 py-4 px-6 flex items-center justify-center ${
                    step === 2 ? "bg-teal-500/20 text-white" : "text-gray-400"
                  }`}
                >
                  <span
                    className={`${
                      step === 2 ? "bg-teal-500/20 text-teal-400" : "bg-gray-800 text-gray-500"
                    } h-6 w-6 rounded-full flex items-center justify-center mr-2`}
                  >
                    2
                  </span>
                  Detalles de Pago
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6">
                {step === 1 ? (
                  <div className="space-y-6">
                    <h2 className="text-xl font-bold mb-4">Selecciona un método de pago</h2>

                    <div className="space-y-4">
                      <div
                        className={`p-4 border ${
                          paymentMethod === "card"
                            ? "border-teal-500 bg-teal-500/10"
                            : "border-gray-700 hover:border-teal-500/50"
                        } rounded-lg cursor-pointer transition-colors`}
                        onClick={() => setPaymentMethod("card")}
                      >
                        <div className="flex items-center">
                          <div
                            className={`w-5 h-5 rounded-full border-2 ${
                              paymentMethod === "card" ? "border-teal-500" : "border-gray-500"
                            } flex items-center justify-center mr-3`}
                          >
                            {paymentMethod === "card" && <div className="w-3 h-3 rounded-full bg-teal-500"></div>}
                          </div>
                          <div className="flex items-center">
                            <CreditCard className="h-5 w-5 mr-2 text-teal-400" />
                            <span className="font-medium">Tarjeta de Crédito/Débito</span>
                          </div>
                        </div>
                      </div>

                      <div
                        className={`p-4 border ${
                          paymentMethod === "paypal"
                            ? "border-teal-500 bg-teal-500/10"
                            : "border-gray-700 hover:border-teal-500/50"
                        } rounded-lg cursor-pointer transition-colors`}
                        onClick={() => setPaymentMethod("paypal")}
                      >
                        <div className="flex items-center">
                          <div
                            className={`w-5 h-5 rounded-full border-2 ${
                              paymentMethod === "paypal" ? "border-teal-500" : "border-gray-500"
                            } flex items-center justify-center mr-3`}
                          >
                            {paymentMethod === "paypal" && <div className="w-3 h-3 rounded-full bg-teal-500"></div>}
                          </div>
                          <div className="flex items-center">
                            <span className="font-bold text-blue-500 mr-1">Pay</span>
                            <span className="font-bold text-blue-700">Pal</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white border-none"
                    >
                      Continuar
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <h2 className="text-xl font-bold mb-4">
                      {paymentMethod === "card" ? "Detalles de la Tarjeta" : "Iniciar Sesión en PayPal"}
                    </h2>

                    {paymentMethod === "card" ? (
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="cardNumber" className="text-gray-300 mb-1">
                            Número de Tarjeta
                          </Label>
                          <div className="relative">
                            <Input
                              id="cardNumber"
                              name="cardNumber"
                              value={cardInfo.cardNumber}
                              onChange={handleCardInfoChange}
                              placeholder="1234 5678 9012 3456"
                              maxLength={19}
                              className="bg-zinc-800/50 border-teal-500/30 text-white pl-10 focus-visible:ring-teal-500"
                            />
                            <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="cardName" className="text-gray-300 mb-1">
                            Nombre en la Tarjeta
                          </Label>
                          <div className="relative">
                            <Input
                              id="cardName"
                              name="cardName"
                              value={cardInfo.cardName}
                              onChange={handleCardInfoChange}
                              placeholder="NOMBRE APELLIDO"
                              className="bg-zinc-800/50 border-teal-500/30 text-white pl-10 focus-visible:ring-teal-500"
                            />
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiryDate" className="text-gray-300 mb-1">
                              Fecha de Expiración
                            </Label>
                            <Input
                              id="expiryDate"
                              name="expiryDate"
                              value={cardInfo.expiryDate}
                              onChange={handleCardInfoChange}
                              placeholder="MM/YY"
                              className="bg-zinc-800/50 border-teal-500/30 text-white focus-visible:ring-teal-500"
                            />
                          </div>
                          <div>
                            <Label htmlFor="cvv" className="text-gray-300 mb-1">
                              CVV
                            </Label>
                            <Input
                              id="cvv"
                              name="cvv"
                              value={cardInfo.cvv}
                              onChange={handleCardInfoChange}
                              placeholder="123"
                              maxLength={3}
                              className="bg-zinc-800/50 border-teal-500/30 text-white focus-visible:ring-teal-500"
                            />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <div className="flex justify-center mb-6">
                          <div className="bg-white p-4 rounded-lg">
                            <div className="flex items-center">
                              <span className="font-bold text-blue-500 text-2xl mr-1">Pay</span>
                              <span className="font-bold text-blue-700 text-2xl">Pal</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-300 mb-4">
                          Serás redirigido a PayPal para completar el pago de forma segura.
                        </p>
                      </div>
                    )}

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white border-none"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                          Procesando...
                        </>
                      ) : (
                        `Pagar S/ ${total.toFixed(2)}`
                      )}
                    </Button>
                  </div>
                )}
              </form>
            </motion.div>
          )}
        </div>
      </div>
    </main>
  )
}
