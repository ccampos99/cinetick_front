"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Play, Calendar, Clock, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { useToast } from "@/components/ui/use-toast"

export default function FeaturedMovie() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 0.9])

  const router = useRouter()
  const { user } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleBuyTickets = () => {
    if (!user) {
      toast({
        title: "Inicia sesión para continuar",
        description: "Necesitas iniciar sesión para comprar entradas",
        variant: "destructive",
      })
      router.push("/login?redirect=/movie/1")
    } else {
      router.push("/movie/1")
    }
  }

  return (
    <motion.div ref={ref} className="relative h-screen w-full overflow-hidden" style={{ opacity, y }}>
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <motion.div style={{ scale }} className="h-full w-full">
          <Image
            src="/images/oppenheimer-bg.png"
            alt="Oppenheimer movie poster"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 via-zinc-900/80 to-transparent z-10"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-20 h-full flex flex-col justify-center pt-16">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              className="mb-4 flex items-center space-x-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 1 }}
            >
              <div className="px-2 py-1 bg-teal-500/20 border border-teal-500/30 rounded-md text-teal-300 text-xs font-semibold">
                ESTRENO
              </div>
              <div className="flex items-center text-yellow-400">
                <Star className="h-4 w-4 fill-yellow-400 mr-1" />
                <span className="font-medium">9.2</span>
                <span className="text-gray-400 text-xs ml-1">/10</span>
              </div>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold mb-4 text-white">
              <motion.span
                className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 text-transparent bg-clip-text"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                OPPEN
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                HEIMER
              </motion.span>
            </h1>

            <motion.div
              className="flex items-center space-x-4 mb-4 text-gray-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              <span className="flex items-center">
                <Clock className="h-4 w-4 mr-1 text-teal-400" />
                180 min
              </span>
              <span className="text-teal-500">|</span>
              <span>Drama, Historia</span>
              <span className="text-teal-500">|</span>
              <span>+13</span>
            </motion.div>

            <motion.p
              className="text-gray-300 mb-8 text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              "Oppenheimer" es una película biográfica dirigida por Christopher Nolan sobre J. Robert Oppenheimer, el
              físico teórico que dirigió el Proyecto Manhattan durante la Segunda Guerra Mundial.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.8 }}
            >
              <Button
                className="bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white border-none"
                onClick={handleBuyTickets}
              >
                <Calendar className="mr-2 h-4 w-4" /> Comprar Entradas
              </Button>
              <Button
                variant="outline"
                className="border-teal-500/50 text-white hover:bg-teal-500/20 hover:border-teal-500"
              >
                <Play className="mr-2 h-4 w-4" /> Ver Trailer
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Vertical text */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 transform -rotate-90 origin-left z-10 hidden lg:block">
        <h2 className="text-9xl font-bold text-white/5 whitespace-nowrap tracking-widest">OPPENHEIMER</h2>
      </div>
    </motion.div>
  )
}
