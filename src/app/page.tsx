"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    // Redireciona para a página de boas-vindas
    router.push("/welcome")
  }, [router])

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#005CFF] mx-auto"></div>
        <p className="mt-4 text-[#1A1A1A] font-inter">Carregando...</p>
      </div>
    </div>
  )
}
