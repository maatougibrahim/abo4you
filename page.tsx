"use client"

import { Grid, MessageSquare, Search as SearchIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import CategoryNav from "./category-nav"
import ServiceCarousel from "./service-carousel"
import { Search } from "@/components/search"
import { useState, useRef } from "react"
import { Syne, Orbitron, Audiowide, Exo_2, Chakra_Petch, Russo_One, Figtree } from 'next/font/google'

const syne = Syne({ 
  subsets: ['latin'],
  weight: ['800', '400']
})

const orbitron = Orbitron({ subsets: ['latin'] })

const audiowide = Audiowide({ 
  weight: '400',
  subsets: ['latin'] 
})

const exo2 = Exo_2({ 
  subsets: ['latin'],
  weight: ['800', '400']
})

const chakraPetch = Chakra_Petch({ 
  subsets: ['latin'],
  weight: ['700']
})

const russoOne = Russo_One({ 
  weight: '400',
  subsets: ['latin'] 
})

const figtree = Figtree({ 
  subsets: ['latin'],
  weight: ['800', '400']
})

export default function Page() {
  const carouselRef = useRef(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const handleSearch = (query: string) => {
    if (carouselRef.current) {
      // @ts-ignore
      carouselRef.current.filterServices(query)
    }
  }

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category)
  }

  return (
    <div className="min-h-screen bg-[#1a0f40]">
      <header className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className={`text-[#00E8DD] text-3xl ${figtree.className} flex items-center gap-2`}
          >
            <span className="font-extrabold tracking-tight">abo4you</span>
          </Link>

          {/* Navigation */}
          <div className="flex items-center gap-12">
            <Link href="/accueil" className="flex flex-col items-center text-white/80 hover:text-white">
              <Grid className="h-6 w-6" />
              <span className="text-sm">Accueil</span>
            </Link>
            <Link href="/explorer" className="flex flex-col items-center text-[#00E8DD]">
              <SearchIcon className="h-6 w-6" />
              <span className="text-sm">Explorer</span>
            </Link>
            <Link href="/messagerie" className="flex flex-col items-center text-white/80 hover:text-white">
              <MessageSquare className="h-6 w-6" />
              <span className="text-sm">Messagerie</span>
            </Link>
          </div>
        </div>

        {/* Search */}
        <div className="relative mx-auto mt-8 max-w-2xl">
          <SearchIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher un abonnement"
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full rounded-full bg-white/10 py-3 pl-12 pr-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00E8DD]"
          />
        </div>
      </header>

      <CategoryNav />

      <main className="relative bg-white pt-16">
        <div
          className="absolute inset-x-0 -top-8 h-16 bg-[#1a0f40]"
          style={{
            borderRadius: "0 0 100% 100%/0 0 100px 100px",
          }}
        />

        <div className="container mx-auto px-4">
          <ServiceCarousel ref={carouselRef} selectedCategory={selectedCategory} />
        </div>
      </main>
    </div>
  )
}

