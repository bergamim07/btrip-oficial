"use client"

import { useState } from "react"
import { Plane, MapPin, Users, Globe, ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

export default function WelcomePage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      if (data.user) {
        router.push("/dashboard")
      }
    } catch (err: any) {
      setError(err.message || "Erro ao fazer login")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const confirmPassword = formData.get("confirm-password") as string

    if (password !== confirmPassword) {
      setError("As senhas não coincidem")
      setIsLoading(false)
      return
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
        },
      })

      if (error) throw error

      if (data.user) {
        // Criar perfil do usuário - REMOVIDO campo email que não existe na tabela
        const { error: profileError } = await supabase
          .from("profiles")
          .insert({
            id: data.user.id,
            full_name: name,
            username: email.split("@")[0],
          })

        if (profileError) {
          console.error("Erro ao criar perfil:", profileError)
        }

        // Redirecionar para dashboard
        router.push("/dashboard")
      }
    } catch (err: any) {
      setError(err.message || "Erro ao criar conta")
    } finally {
      setIsLoading(false)
    }
  }

  const features = [
    {
      icon: MapPin,
      title: "Roteiros Personalizados",
      description: "Crie roteiros sob medida para seu estilo de viagem"
    },
    {
      icon: Globe,
      title: "Descubra Destinos",
      description: "Explore lugares incríveis ao redor do mundo"
    },
    {
      icon: Users,
      title: "Comunidade Ativa",
      description: "Compartilhe experiências com outros viajantes"
    }
  ]

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row">
      {/* Left Side - Branding & Info */}
      <div className="lg:w-1/2 bg-[#005CFF] text-white p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
        <div className="max-w-xl mx-auto">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-white p-3 rounded-2xl">
              <Plane className="w-8 h-8 text-[#005CFF]" />
            </div>
            <span className="text-4xl font-extrabold font-geist-sans">BTRIP</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight font-geist-sans">
            Sua viagem.
            <span className="block text-[#00E0C7]">Do seu jeito.</span>
          </h1>

          <p className="text-lg sm:text-xl mb-12 text-white/90 font-inter">
            O jeito moderno de planejar viagens. Crie roteiros inteligentes, descubra destinos incríveis e conecte-se com viajantes do mundo todo.
          </p>

          {/* Features */}
          <div className="space-y-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl">
                  <feature.icon className="w-6 h-6 text-[#00E0C7]" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1 font-geist-sans">{feature.title}</h3>
                  <p className="text-white/80 font-inter">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mt-12 pt-12 border-t border-white/20">
            <div>
              <div className="text-3xl font-extrabold mb-1 font-geist-sans">150+</div>
              <div className="text-sm text-white/70 font-inter">Países</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold mb-1 font-geist-sans">50k+</div>
              <div className="text-sm text-white/70 font-inter">Viajantes</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold mb-1 font-geist-sans">10k+</div>
              <div className="text-sm text-white/70 font-inter">Roteiros</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Auth Forms */}
      <div className="lg:w-1/2 p-8 sm:p-12 lg:p-16 flex items-center justify-center bg-white">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center lg:text-left">
            <h2 className="text-3xl font-extrabold text-[#1A1A1A] mb-2 font-geist-sans">
              Comece sua jornada
            </h2>
            <p className="text-[#1A1A1A] opacity-70 font-inter">
              Crie sua conta ou faça login para começar
            </p>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600 font-inter">{error}</p>
            </div>
          )}

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 bg-[#E5E7EB]">
              <TabsTrigger 
                value="login"
                className="data-[state=active]:bg-white data-[state=active]:text-[#005CFF] font-inter font-semibold"
              >
                Entrar
              </TabsTrigger>
              <TabsTrigger 
                value="signup"
                className="data-[state=active]:bg-white data-[state=active]:text-[#005CFF] font-inter font-semibold"
              >
                Cadastrar
              </TabsTrigger>
            </TabsList>

            {/* Login Form */}
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email" className="font-inter">E-mail</Label>
                  <Input
                    id="login-email"
                    name="email"
                    type="email"
                    placeholder="seu@email.com"
                    required
                    className="border-[#E5E7EB] focus:border-[#005CFF] h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password" className="font-inter">Senha</Label>
                  <Input
                    id="login-password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    required
                    className="border-[#E5E7EB] focus:border-[#005CFF] h-12"
                  />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded border-[#E5E7EB]" />
                    <span className="text-[#1A1A1A] opacity-70 font-inter">Lembrar de mim</span>
                  </label>
                  <a href="#" className="text-[#005CFF] hover:text-[#0047CC] font-inter">
                    Esqueceu a senha?
                  </a>
                </div>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#005CFF] hover:bg-[#0047CC] text-white h-12 text-base font-inter font-semibold"
                >
                  {isLoading ? "Entrando..." : "Entrar"}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </form>
            </TabsContent>

            {/* Signup Form */}
            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name" className="font-inter">Nome completo</Label>
                  <Input
                    id="signup-name"
                    name="name"
                    type="text"
                    placeholder="Seu nome"
                    required
                    className="border-[#E5E7EB] focus:border-[#005CFF] h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email" className="font-inter">E-mail</Label>
                  <Input
                    id="signup-email"
                    name="email"
                    type="email"
                    placeholder="seu@email.com"
                    required
                    className="border-[#E5E7EB] focus:border-[#005CFF] h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password" className="font-inter">Senha</Label>
                  <Input
                    id="signup-password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    required
                    minLength={6}
                    className="border-[#E5E7EB] focus:border-[#005CFF] h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-confirm" className="font-inter">Confirmar senha</Label>
                  <Input
                    id="signup-confirm"
                    name="confirm-password"
                    type="password"
                    placeholder="••••••••"
                    required
                    minLength={6}
                    className="border-[#E5E7EB] focus:border-[#005CFF] h-12"
                  />
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <input type="checkbox" required className="mt-1 rounded border-[#E5E7EB]" />
                  <span className="text-[#1A1A1A] opacity-70 font-inter">
                    Aceito os{" "}
                    <a href="#" className="text-[#005CFF] hover:text-[#0047CC]">
                      termos de uso
                    </a>{" "}
                    e{" "}
                    <a href="#" className="text-[#005CFF] hover:text-[#0047CC]">
                      política de privacidade
                    </a>
                  </span>
                </div>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#005CFF] hover:bg-[#0047CC] text-white h-12 text-base font-inter font-semibold"
                >
                  {isLoading ? "Criando conta..." : "Criar conta"}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          {/* Social Login */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#E5E7EB]"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-[#1A1A1A] opacity-70 font-inter">
                  Ou continue com
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <Button
                variant="outline"
                className="border-[#E5E7EB] hover:bg-[#E5E7EB] h-12 font-inter"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google
              </Button>
              <Button
                variant="outline"
                className="border-[#E5E7EB] hover:bg-[#E5E7EB] h-12 font-inter"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </Button>
            </div>
          </div>

          {/* Benefits */}
          <Card className="mt-8 border-[#E5E7EB] bg-[#E5E7EB]/30">
            <CardContent className="pt-6">
              <h3 className="font-bold text-[#1A1A1A] mb-4 font-geist-sans">
                Por que usar o BTRIP?
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="bg-[#00E0C7] rounded-full p-1 mt-0.5">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm text-[#1A1A1A] font-inter">
                    Roteiros inteligentes em 1 toque
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-[#00E0C7] rounded-full p-1 mt-0.5">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm text-[#1A1A1A] font-inter">
                    Descubra destinos personalizados
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-[#00E0C7] rounded-full p-1 mt-0.5">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm text-[#1A1A1A] font-inter">
                    Compartilhe com a comunidade
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
