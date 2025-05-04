"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Building, Mail, Phone, MapPin, Clock, Users, Star, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Navbar from "@/components/navbar"
import FloatingParticles from "@/components/floating-particles"
import { toast } from "sonner"
import Image from "next/image"

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState<"about" | "contact">("about")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.message) {
      toast("Campos incompletos", {
        description: "Por favor completa todos los campos requeridos",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      toast("Mensaje enviado", {
        description: "Gracias por contactarnos. Te responderemos a la brevedad.",
      })
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
      setIsSubmitting(false)
    }, 1500)
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
          Nosotros
        </motion.h1>

        <motion.p
          className="text-xl text-gray-300 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Conoce más sobre CINETICK y nuestra misión de transformar la experiencia cinematográfica
        </motion.p>

        <div className="flex border-b border-teal-500/20 mb-8">
          <button
            className={`py-4 px-6 font-medium ${
              activeTab === "about" ? "border-b-2 border-teal-500 text-white" : "text-gray-400 hover:text-white"
            }`}
            onClick={() => setActiveTab("about")}
          >
            Sobre Nosotros
          </button>
          <button
            className={`py-4 px-6 font-medium ${
              activeTab === "contact" ? "border-b-2 border-teal-500 text-white" : "text-gray-400 hover:text-white"
            }`}
            onClick={() => setActiveTab("contact")}
          >
            Contacto
          </button>
        </div>

        {activeTab === "about" ? (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h2 className="text-2xl font-bold mb-4">Nuestra Historia</h2>
                <p className="text-gray-300 mb-4">
                  CINETICK nació en 2020 con la visión de revolucionar la forma en que las personas disfrutan del cine.
                  Combinando la magia tradicional del séptimo arte con las últimas tecnologías, hemos creado una
                  experiencia cinematográfica única que va más allá de la pantalla.
                </p>
                <p className="text-gray-300">
                  Desde nuestros inicios, nos hemos comprometido a ofrecer no solo las mejores películas, sino también
                  las mejores instalaciones, servicio al cliente excepcional y tecnologías innovadoras como realidad
                  aumentada y experiencias virtuales que complementan la experiencia cinematográfica.
                </p>
              </motion.div>

              <motion.div
                className="relative h-64 md:h-auto rounded-lg overflow-hidden"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="CINETICK Theater"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </div>

            <motion.div
              className="mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <h2 className="text-2xl font-bold mb-6">Nuestros Valores</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-zinc-900/50 backdrop-blur-sm rounded-lg p-6 border border-teal-500/10">
                  <div className="bg-teal-500/20 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <Star className="h-6 w-6 text-teal-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Excelencia</h3>
                  <p className="text-gray-400">
                    Nos esforzamos por ofrecer la mejor calidad en cada aspecto de la experiencia cinematográfica, desde
                    la proyección hasta el servicio al cliente.
                  </p>
                </div>

                <div className="bg-zinc-900/50 backdrop-blur-sm rounded-lg p-6 border border-teal-500/10">
                  <div className="bg-teal-500/20 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-teal-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Comunidad</h3>
                  <p className="text-gray-400">
                    Creemos en el poder del cine para unir a las personas y crear comunidades. Fomentamos espacios de
                    encuentro y diálogo en torno al séptimo arte.
                  </p>
                </div>

                <div className="bg-zinc-900/50 backdrop-blur-sm rounded-lg p-6 border border-teal-500/10">
                  <div className="bg-teal-500/20 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <MessageSquare className="h-6 w-6 text-teal-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Innovación</h3>
                  <p className="text-gray-400">
                    Constantemente buscamos nuevas formas de mejorar y enriquecer la experiencia cinematográfica a
                    través de la tecnología y la creatividad.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <h2 className="text-2xl font-bold mb-6">Nuestras Instalaciones</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative h-64 rounded-lg overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt="CINETICK Lobby"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-xl font-bold">Lobby Futurista</h3>
                  </div>
                </div>

                <div className="relative h-64 rounded-lg overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt="CINETICK Theater"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-xl font-bold">Salas Premium</h3>
                  </div>
                </div>

                <div className="relative h-64 rounded-lg overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt="CINETICK VR Zone"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-xl font-bold">Zona VR</h3>
                  </div>
                </div>

                <div className="relative h-64 rounded-lg overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt="CINETICK Cafe"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-xl font-bold">Café Temático</h3>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold mb-6">Información de Contacto</h2>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-teal-500/20 p-2 rounded-full flex-shrink-0 mr-4">
                    <Building className="h-5 w-5 text-teal-400" />
                  </div>
                  <div>
                    <h3 className="font-medium">Dirección</h3>
                    <p className="text-gray-400">Av. Cinematográfica 123, Ciudad Película</p>
                  </div>
                  <div>
                </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-teal-500/20 p-2 rounded-full flex-shrink-0 mr-4">
                    <Mail className="h-5 w-5 text-teal-400" />
                  </div>
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="text-gray-400">info@cinetick.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-teal-500/20 p-2 rounded-full flex-shrink-0 mr-4">
                    <Phone className="h-5 w-5 text-teal-400" />
                  </div>
                  <div>
                    <h3 className="font-medium">Teléfono</h3>
                    <p className="text-gray-400">+51 123 456 789</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-teal-500/20 p-2 rounded-full flex-shrink-0 mr-4">
                    <Clock className="h-5 w-5 text-teal-400" />
                  </div>
                  <div>
                    <h3 className="font-medium">Horario de Atención</h3>
                    <p className="text-gray-400">Lunes a Domingo: 11:00 - 23:00</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="font-medium mb-4">Ubicación</h3>
                <div className="h-64 bg-zinc-800 rounded-lg relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <MapPin className="h-12 w-12 text-teal-400/50" />
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <Button className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white border-none">
                      Ver en Google Maps
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h2 className="text-2xl font-bold mb-6">Envíanos un Mensaje</h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                    Nombre completo <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="bg-zinc-800/50 border-teal-500/30 text-white focus-visible:ring-teal-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="bg-zinc-800/50 border-teal-500/30 text-white focus-visible:ring-teal-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">
                    Asunto
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="bg-zinc-800/50 border-teal-500/30 text-white focus-visible:ring-teal-500"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                    Mensaje <span className="text-red-500">*</span>
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="bg-zinc-800/50 border-teal-500/30 text-white focus-visible:ring-teal-500 min-h-[150px]"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white border-none"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                      Enviando...
                    </>
                  ) : (
                    "Enviar Mensaje"
                  )}
                </Button>
              </form>

              <div className="mt-8 p-4 bg-teal-500/10 border border-teal-500/30 rounded-lg">
                <h3 className="font-medium mb-2 flex items-center">
                  <MessageSquare className="h-4 w-4 mr-2 text-teal-400" />
                  Atención al Cliente
                </h3>
                <p className="text-sm text-gray-400">
                  Para consultas sobre reservas, promociones o problemas con tu compra, contáctanos directamente por
                  teléfono o visita nuestro mostrador de atención al cliente en cualquiera de nuestras sedes.
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </main>
  )
}
