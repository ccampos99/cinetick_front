"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { api } from "./api"

interface User {
  idUsuario: number
  nombreCompleto: string
  correo: string
  idRol: number
}

interface AuthContextType {
  user: User | null
  login: (correo: string, clave: string) => Promise<void>
  register: (nombreCompleto: string, correo: string, clave: string) => Promise<void>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (correo: string, clave: string) => {
    try {
      const response = await api.login(correo, clave)
      console.log("Login response:", response)
      if (response.success) {
        setUser(response.user!) // ← solucionamos el warning de TypeScript con "!"
        localStorage.setItem("user", JSON.stringify(response.user))
      } else {
        throw new Error("Login failed")
      }
    } catch (error) {
      console.error("Login error:", error)
      throw error
    }
  }

  const register = async (nombreCompleto: string, correo: string, clave: string) => {
    try {
      const response = await api.register(nombreCompleto, correo, clave)
      console.log("Register response:", response)
      if (response.success) {
        setUser(response.user!) // ← lo mismo aquí
        localStorage.setItem("user", JSON.stringify(response.user))
      } else {
        throw new Error("Registration failed")
      }
    } catch (error) {
      console.error("Registration error:", error)
      throw error
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
