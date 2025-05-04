"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Menu, X, User, Search, LogOut, Film, Ticket, Info, Home, Zap, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "sonner"
import { useAuth } from "@/lib/auth-context"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const router = useRouter()
  const { user, logout } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLogout = () => {
    logout()
    toast("Sesión cerrada", {
      description: "Has cerrado sesión correctamente",
    })
    router.push("/")
  }

  return (
    <motion.nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-black/80 backdrop-blur-md border-b border-teal-500/20 py-2" : "bg-transparent py-4"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <motion.div
                className="font-bold text-2xl flex items-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
                  CINE
                </span>
                <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
                  TICK
                </span>
                <Zap className="h-5 w-5 ml-1 text-teal-400" />
              </motion.div>
            </Link>
            <div className="hidden md:flex ml-10">
              <div className="flex items-center space-x-8">
                <NavLink href="/" icon={<Home className="h-4 w-4 mr-1" />}>
                  Inicio
                </NavLink>
                <NavLink href="/movies" icon={<Film className="h-4 w-4 mr-1" />}>
                  Películas
                </NavLink>
                <NavLink href="/promotions" icon={<Ticket className="h-4 w-4 mr-1" />}>
                  Promociones
                </NavLink>
                <NavLink href="/about" icon={<Info className="h-4 w-4 mr-1" />}>
                  Nosotros
                </NavLink>
                <NavLink href="/ar-experience" icon={<Sparkles className="h-4 w-4 mr-1" />}>
                  AR Experience
                </NavLink>
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <AnimatePresence>
              {isSearchOpen ? (
                <motion.div
                  className="relative"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: "auto", opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Input
                    type="text"
                    placeholder="Buscar películas..."
                    className="bg-zinc-800/50 border-teal-500/30 text-white w-64 focus-visible:ring-teal-500"
                    autoFocus
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 text-gray-400 hover:text-white"
                    onClick={() => setIsSearchOpen(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </motion.div>
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsSearchOpen(true)}
                    className="text-gray-400 hover:text-white hover:bg-teal-500/20"
                  >
                    <Search className="h-5 w-5" />
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="rounded-full border-teal-500/50 bg-zinc-800/50 hover:bg-teal-500/20 hover:border-teal-500"
                  >
                    <span className="mr-2">{user.nombreCompleto.split(" ")[0]}</span>
                    <User className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-zinc-900 border-teal-500/50">
                  <DropdownMenuItem className="cursor-pointer" onClick={() => router.push("/profile")}>
                    <User className="mr-2 h-4 w-4" /> Mi Perfil
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer" onClick={() => router.push("/tickets")}>
                    <Ticket className="mr-2 h-4 w-4" /> Mis Entradas
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer text-red-400" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" /> Cerrar Sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                variant="outline"
                className="border-teal-500/50 bg-zinc-800/50 hover:bg-teal-500/20 hover:border-teal-500"
                onClick={() => router.push("/login")}
              >
                <User className="mr-2 h-4 w-4" />
                Iniciar Sesión
              </Button>
            )}
          </div>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-400 hover:text-white"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden bg-zinc-900/95 backdrop-blur-md border-b border-teal-500/20"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                href="/"
                className="flex items-center px-3 py-2 text-white hover:bg-teal-500/20 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                <Home className="h-4 w-4 mr-2" /> Inicio
              </Link>
              <Link
                href="/movies"
                className="flex items-center px-3 py-2 text-white hover:bg-teal-500/20 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                <Film className="h-4 w-4 mr-2" /> Películas
              </Link>
              <Link
                href="/promotions"
                className="flex items-center px-3 py-2 text-white hover:bg-teal-500/20 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                <Ticket className="h-4 w-4 mr-2" /> Promociones
              </Link>
              <Link
                href="/about"
                className="flex items-center px-3 py-2 text-white hover:bg-teal-500/20 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                <Info className="h-4 w-4 mr-2" /> Nosotros
              </Link>
              <Link
                href="/ar-experience"
                className="flex items-center px-3 py-2 text-white hover:bg-teal-500/20 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                <Sparkles className="h-4 w-4 mr-2" /> AR Experience
              </Link>
              <div className="pt-4 pb-3 border-t border-teal-500/20">
                {user ? (
                  <>
                    <div className="flex items-center px-5 py-2">
                      <div className="flex-shrink-0 bg-teal-500/20 p-2 rounded-full">
                        <User className="h-6 w-6 text-teal-300" />
                      </div>
                      <div className="ml-3">
                        <div className="text-base font-medium text-white">{user.nombreCompleto}</div>
                        <div className="text-sm text-gray-400">{user.correo}</div>
                      </div>
                    </div>
                    <div className="mt-3 px-2 space-y-1">
                      <Link
                        href="/profile"
                        className="flex items-center px-3 py-2 text-white hover:bg-teal-500/20 rounded-md"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <User className="h-4 w-4 mr-2" /> Mi Perfil
                      </Link>
                      <Link
                        href="/tickets"
                        className="flex items-center px-3 py-2 text-white hover:bg-teal-500/20 rounded-md"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Ticket className="h-4 w-4 mr-2" /> Mis Entradas
                      </Link>
                      <button
                        className="flex items-center w-full text-left px-3 py-2 text-red-400 hover:bg-red-500/10 rounded-md"
                        onClick={() => {
                          logout()
                          setIsMenuOpen(false)
                          router.push("/")
                        }}
                      >
                        <LogOut className="h-4 w-4 mr-2" /> Cerrar Sesión
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="mt-3 px-2 space-y-1">
                    <Link
                      href="/login"
                      className="flex items-center px-3 py-2 text-white hover:bg-teal-500/20 rounded-md"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User className="h-4 w-4 mr-2" /> Iniciar Sesión
                    </Link>
                    <Link
                      href="/register"
                      className="flex items-center px-3 py-2 text-white hover:bg-teal-500/20 rounded-md"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User className="h-4 w-4 mr-2" /> Registrarse
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

function NavLink({ href, children, icon }: { href: string; children: React.ReactNode; icon: React.ReactNode }) {
  return (
    <Link href={href} className="group relative">
      <div className="flex items-center text-gray-300 group-hover:text-white transition-colors">
        {icon}
        {children}
      </div>
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-400 to-cyan-500 transition-all duration-300 group-hover:w-full" />
    </Link>
  )
}
