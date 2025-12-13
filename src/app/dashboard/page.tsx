"use client"

import { useState } from "react"
import { MapPin, Compass, Users, Heart, Calendar, Clock, Star, Plus, Search, TrendingUp, Globe, Plane, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Dashboard() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  // Mock data - destinos populares
  const popularDestinations = [
    {
      id: 1,
      name: "Paris, França",
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=600&fit=crop",
      rating: 4.9,
      travelers: "2.4k",
      description: "Cidade luz, romance e cultura",
      tags: ["Cultura", "Romance", "Gastronomia"]
    },
    {
      id: 2,
      name: "Tóquio, Japão",
      image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop",
      rating: 4.8,
      travelers: "1.8k",
      description: "Tradição encontra modernidade",
      tags: ["Tecnologia", "Cultura", "Gastronomia"]
    },
    {
      id: 3,
      name: "Bali, Indonésia",
      image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&h=600&fit=crop",
      rating: 4.9,
      travelers: "3.1k",
      description: "Paraíso tropical e espiritual",
      tags: ["Praia", "Natureza", "Relaxamento"]
    },
    {
      id: 4,
      name: "Nova York, EUA",
      image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&h=600&fit=crop",
      rating: 4.7,
      travelers: "2.9k",
      description: "A cidade que nunca dorme",
      tags: ["Urbano", "Cultura", "Compras"]
    }
  ]

  // Mock data - roteiros da comunidade
  const communityItineraries = [
    {
      id: 1,
      title: "7 dias em Paris: Do clássico ao alternativo",
      author: "Ana Silva",
      authorAvatar: "AS",
      destination: "Paris, França",
      duration: "7 dias",
      likes: 342,
      saves: 128,
      image: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=800&h=600&fit=crop",
      tags: ["Cultura", "Gastronomia", "Arte"]
    },
    {
      id: 2,
      title: "Aventura em Tóquio: Guia completo",
      author: "Pedro Costa",
      authorAvatar: "PC",
      destination: "Tóquio, Japão",
      duration: "10 dias",
      likes: 289,
      saves: 95,
      image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&h=600&fit=crop",
      tags: ["Tecnologia", "Templos", "Street Food"]
    },
    {
      id: 3,
      title: "Bali Zen: Roteiro de bem-estar",
      author: "Maria Santos",
      authorAvatar: "MS",
      destination: "Bali, Indonésia",
      duration: "14 dias",
      likes: 456,
      saves: 201,
      image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800&h=600&fit=crop",
      tags: ["Yoga", "Praias", "Natureza"]
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#E5E7EB]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="bg-[#005CFF] p-2 rounded-xl">
                <Plane className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-extrabold text-[#005CFF] font-geist-sans">
                BTRIP
              </span>
            </div>
            
            <div className="hidden md:flex items-center gap-6">
              <button className="text-[#1A1A1A] hover:text-[#005CFF] transition-colors font-medium font-inter">
                Descobrir
              </button>
              <button className="text-[#1A1A1A] hover:text-[#005CFF] transition-colors font-medium font-inter">
                Roteiros
              </button>
              <button className="text-[#1A1A1A] hover:text-[#005CFF] transition-colors font-medium font-inter">
                Comunidade
              </button>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" className="hidden sm:flex text-[#1A1A1A] hover:text-[#005CFF] hover:bg-[#E5E7EB]">
                Perfil
              </Button>
              <Button 
                size="sm"
                className="bg-[#005CFF] hover:bg-[#0047CC] text-white font-inter"
              >
                <Plus className="w-4 h-4 mr-1" />
                Novo Roteiro
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-16 sm:py-24 lg:py-32 overflow-hidden bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-[#00E0C7] text-[#1A1A1A] border-0 px-4 py-1 hover:bg-[#00E0C7]">
              <TrendingUp className="w-3 h-3 mr-1" />
              Mais de 10k roteiros criados
            </Badge>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1A1A1A] mb-6 leading-tight font-geist-sans">
              Planeje sua próxima
              <span className="block text-[#005CFF]">
                aventura perfeita
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-[#1A1A1A] mb-8 max-w-2xl mx-auto font-inter">
              Crie roteiros personalizados, descubra destinos incríveis e compartilhe suas experiências com viajantes do mundo todo.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
                <DialogTrigger asChild>
                  <Button 
                    size="lg"
                    className="bg-[#005CFF] hover:bg-[#0047CC] text-white shadow-lg hover:shadow-xl transition-all duration-300 text-base font-inter"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Criar Roteiro
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-extrabold text-[#1A1A1A] font-geist-sans">Criar Novo Roteiro</DialogTitle>
                    <DialogDescription className="font-inter">
                      Comece a planejar sua próxima aventura. Preencha os detalhes abaixo.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="title" className="font-inter">Título do Roteiro</Label>
                      <Input 
                        id="title" 
                        placeholder="Ex: 10 dias em Paris"
                        className="border-[#E5E7EB] focus:border-[#005CFF]"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="destination" className="font-inter">Destino</Label>
                      <Input 
                        id="destination" 
                        placeholder="Ex: Paris, França"
                        className="border-[#E5E7EB] focus:border-[#005CFF]"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="duration" className="font-inter">Duração</Label>
                        <Input 
                          id="duration" 
                          placeholder="Ex: 7 dias"
                          className="border-[#E5E7EB] focus:border-[#005CFF]"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="budget" className="font-inter">Orçamento</Label>
                        <Input 
                          id="budget" 
                          placeholder="Ex: R$ 5.000"
                          className="border-[#E5E7EB] focus:border-[#005CFF]"
                        />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="description" className="font-inter">Descrição</Label>
                      <Textarea 
                        id="description" 
                        placeholder="Conte um pouco sobre sua viagem..."
                        className="border-[#E5E7EB] focus:border-[#005CFF] min-h-[100px]"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button 
                      variant="outline" 
                      onClick={() => setIsCreateModalOpen(false)}
                      className="border-[#E5E7EB] text-[#1A1A1A] hover:bg-[#E5E7EB]"
                    >
                      Cancelar
                    </Button>
                    <Button 
                      className="bg-[#005CFF] hover:bg-[#0047CC] text-white"
                      onClick={() => setIsCreateModalOpen(false)}
                    >
                      Criar Roteiro
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-[#005CFF] text-[#005CFF] hover:bg-[#005CFF] hover:text-white text-base font-inter"
              >
                <Compass className="w-5 h-5 mr-2" />
                Explorar Destinos
              </Button>
            </div>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#1A1A1A] opacity-40 w-5 h-5" />
                <Input 
                  type="text"
                  placeholder="Buscar destinos, roteiros ou experiências..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-6 text-base border-2 border-[#E5E7EB] focus:border-[#005CFF] rounded-2xl shadow-lg font-inter"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-y border-[#E5E7EB]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Globe className="w-8 h-8 text-[#005CFF]" />
              </div>
              <div className="text-3xl font-extrabold text-[#1A1A1A] font-geist-sans">150+</div>
              <div className="text-sm text-[#1A1A1A] opacity-70 font-inter">Países</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Users className="w-8 h-8 text-[#00E0C7]" />
              </div>
              <div className="text-3xl font-extrabold text-[#1A1A1A] font-geist-sans">50k+</div>
              <div className="text-sm text-[#1A1A1A] opacity-70 font-inter">Viajantes</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <MapPin className="w-8 h-8 text-[#005CFF]" />
              </div>
              <div className="text-3xl font-extrabold text-[#1A1A1A] font-geist-sans">10k+</div>
              <div className="text-sm text-[#1A1A1A] opacity-70 font-inter">Roteiros</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Camera className="w-8 h-8 text-[#00E0C7]" />
              </div>
              <div className="text-3xl font-extrabold text-[#1A1A1A] font-geist-sans">100k+</div>
              <div className="text-sm text-[#1A1A1A] opacity-70 font-inter">Fotos</div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A1A1A] mb-2 font-geist-sans">
                Destinos Populares
              </h2>
              <p className="text-[#1A1A1A] opacity-70 font-inter">
                Explore os lugares mais amados pela comunidade
              </p>
            </div>
            <Button variant="ghost" className="hidden sm:flex text-[#005CFF] hover:text-[#0047CC] hover:bg-[#E5E7EB]">
              Ver todos
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularDestinations.map((destination) => (
              <Card 
                key={destination.id} 
                className="group overflow-hidden border border-[#E5E7EB] shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer hover:border-[#005CFF]"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={destination.image} 
                    alt={destination.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
                    <Star className="w-4 h-4 fill-[#00E0C7] text-[#00E0C7]" />
                    <span className="text-sm font-semibold text-[#1A1A1A]">{destination.rating}</span>
                  </div>
                </div>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-[#1A1A1A] font-extrabold font-geist-sans">{destination.name}</CardTitle>
                  <CardDescription className="text-sm text-[#1A1A1A] opacity-70 font-inter">
                    {destination.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="flex flex-wrap gap-1">
                    {destination.tags.map((tag, index) => (
                      <Badge 
                        key={index} 
                        variant="secondary" 
                        className="text-xs bg-[#E5E7EB] text-[#1A1A1A] hover:bg-[#005CFF] hover:text-white font-inter"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <div className="flex items-center text-sm text-[#1A1A1A] opacity-70 font-inter">
                    <Users className="w-4 h-4 mr-1" />
                    {destination.travelers} viajantes
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Community Itineraries */}
      <section className="py-16 sm:py-24 bg-[#E5E7EB]/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A1A1A] mb-2 font-geist-sans">
                Roteiros da Comunidade
              </h2>
              <p className="text-[#1A1A1A] opacity-70 font-inter">
                Inspire-se com experiências reais de outros viajantes
              </p>
            </div>
            <Button variant="ghost" className="hidden sm:flex text-[#005CFF] hover:text-[#0047CC] hover:bg-white">
              Ver todos
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {communityItineraries.map((itinerary) => (
              <Card 
                key={itinerary.id} 
                className="group overflow-hidden border border-[#E5E7EB] bg-white shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer hover:border-[#005CFF]"
              >
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={itinerary.image} 
                    alt={itinerary.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <Badge className="mb-2 bg-white/90 text-[#1A1A1A] hover:bg-white border-0">
                      <MapPin className="w-3 h-3 mr-1" />
                      {itinerary.destination}
                    </Badge>
                  </div>
                </div>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg line-clamp-2 text-[#1A1A1A] font-extrabold font-geist-sans">
                    {itinerary.title}
                  </CardTitle>
                  <div className="flex items-center gap-2 mt-2">
                    <Avatar className="w-6 h-6">
                      <AvatarFallback className="text-xs bg-[#005CFF] text-white font-inter">
                        {itinerary.authorAvatar}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-[#1A1A1A] opacity-70 font-inter">{itinerary.author}</span>
                  </div>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="flex flex-wrap gap-1 mb-3">
                    {itinerary.tags.map((tag, index) => (
                      <Badge 
                        key={index} 
                        variant="secondary" 
                        className="text-xs bg-[#E5E7EB] text-[#1A1A1A] hover:bg-[#00E0C7] hover:text-[#1A1A1A] font-inter"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-[#1A1A1A] opacity-70 font-inter">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {itinerary.duration}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0 flex items-center justify-between">
                  <div className="flex items-center gap-3 text-sm text-[#1A1A1A] opacity-70 font-inter">
                    <button className="flex items-center gap-1 hover:text-[#005CFF] transition-colors">
                      <Heart className="w-4 h-4" />
                      {itinerary.likes}
                    </button>
                    <button className="flex items-center gap-1 hover:text-[#00E0C7] transition-colors">
                      <Calendar className="w-4 h-4" />
                      {itinerary.saves}
                    </button>
                  </div>
                  <Button 
                    size="sm" 
                    variant="ghost"
                    className="text-[#005CFF] hover:text-[#0047CC] hover:bg-[#E5E7EB] font-inter"
                  >
                    Ver roteiro
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 bg-[#005CFF]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 font-geist-sans">
              Pronto para sua próxima aventura?
            </h2>
            <p className="text-lg sm:text-xl mb-8 text-white/90 font-inter">
              Junte-se a milhares de viajantes e comece a planejar hoje mesmo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-white text-[#005CFF] hover:bg-[#E5E7EB] shadow-lg text-base font-inter font-semibold"
              >
                <Plus className="w-5 h-5 mr-2" />
                Criar Meu Roteiro
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10 text-base font-inter"
              >
                Explorar Comunidade
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1A1A1A] text-white/70 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-semibold text-white mb-4 font-geist-sans">Sobre</h3>
              <ul className="space-y-2 text-sm font-inter">
                <li><a href="#" className="hover:text-[#00E0C7] transition-colors">Quem Somos</a></li>
                <li><a href="#" className="hover:text-[#00E0C7] transition-colors">Como Funciona</a></li>
                <li><a href="#" className="hover:text-[#00E0C7] transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4 font-geist-sans">Comunidade</h3>
              <ul className="space-y-2 text-sm font-inter">
                <li><a href="#" className="hover:text-[#00E0C7] transition-colors">Roteiros</a></li>
                <li><a href="#" className="hover:text-[#00E0C7] transition-colors">Viajantes</a></li>
                <li><a href="#" className="hover:text-[#00E0C7] transition-colors">Eventos</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4 font-geist-sans">Suporte</h3>
              <ul className="space-y-2 text-sm font-inter">
                <li><a href="#" className="hover:text-[#00E0C7] transition-colors">Central de Ajuda</a></li>
                <li><a href="#" className="hover:text-[#00E0C7] transition-colors">Contato</a></li>
                <li><a href="#" className="hover:text-[#00E0C7] transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4 font-geist-sans">Legal</h3>
              <ul className="space-y-2 text-sm font-inter">
                <li><a href="#" className="hover:text-[#00E0C7] transition-colors">Privacidade</a></li>
                <li><a href="#" className="hover:text-[#00E0C7] transition-colors">Termos</a></li>
                <li><a href="#" className="hover:text-[#00E0C7] transition-colors">Cookies</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="bg-[#005CFF] p-2 rounded-xl">
                <Plane className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-extrabold text-white font-geist-sans">BTRIP</span>
            </div>
            <p className="text-sm text-white/50 font-inter">
              © 2024 BTRIP. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
