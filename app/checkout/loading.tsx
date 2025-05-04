import { Loader } from "lucide-react"

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-teal-950/10 to-zinc-900 text-white flex items-center justify-center">
      <div className="flex flex-col items-center">
        <Loader className="h-12 w-12 text-teal-400 animate-spin mb-4" />
        <p className="text-lg text-teal-400">Cargando información de pago...</p>
      </div>
    </div>
  )
}
