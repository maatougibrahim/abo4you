"use client"

import { ChevronLeft, ChevronRight, Popcorn, Music2, Lock, Euro } from "lucide-react"
import { useState, forwardRef, useImperativeHandle } from "react"

interface Subscription {
  name: string
  price: number
  startingFrom: boolean
  category: string
}

// Define the type for the ref
interface ServiceCarouselRef {
  filterServices: (query: string) => void;
}

const allSubscriptions: Subscription[] = [
  // SVOD
  { name: "YouTube Premium", price: 5.54, startingFrom: false, category: "svod" },
  { name: "Disney+", price: 4.05, startingFrom: true, category: "svod" },
  { name: "Netflix", price: 10.78, startingFrom: true, category: "svod" },
  { name: "Crunchyroll", price: 2.74, startingFrom: true, category: "svod" },

  // Music
  { name: "Spotify", price: 4.14, startingFrom: true, category: "music" },
  { name: "YouTube Music", price: 3.49, startingFrom: false, category: "music" },
  { name: "Apple Music", price: 3.96, startingFrom: false, category: "music" },
  { name: "Tidal", price: 4.99, startingFrom: false, category: "music" },

  // Security
  { name: "NordVPN", price: 3.99, startingFrom: false, category: "security" },
  { name: "Cyber Ghost", price: 2.99, startingFrom: false, category: "security" },
  { name: "Dashlane", price: 4.99, startingFrom: false, category: "security" },
  { name: "Bitdefender", price: 3.99, startingFrom: false, category: "security" }
]

interface ServiceSectionProps {
  title: string
  icon: React.ElementType
  services: Subscription[]
  color: string
  language: string
}

interface ServiceCarouselProps {
  selectedCategory: string | null;
  language: string;
}

// Correctly type the ref in forwardRef
const ServiceCarousel = forwardRef<ServiceCarouselRef, ServiceCarouselProps>(({ selectedCategory, language }, ref) => {
  const [filteredSubscriptions, setFilteredSubscriptions] = useState(allSubscriptions)

  useImperativeHandle(ref, () => ({
    filterServices: (query: string) => {
      if (!query.trim()) {
        setFilteredSubscriptions(allSubscriptions)
        return
      }
      const filtered = allSubscriptions.filter(sub => 
        sub.name.toLowerCase().includes(query.toLowerCase())
      )
      setFilteredSubscriptions(filtered)
    }
  }))

  const groupedSubscriptions = filteredSubscriptions.reduce((acc, sub) => {
    if (!acc[sub.category]) {
      acc[sub.category] = []
    }
    acc[sub.category].push(sub)
    return acc
  }, {} as Record<string, Subscription[]>)

  const ServiceSection = ({ title, icon: Icon, services, color, language }: ServiceSectionProps) => (
    <section className="py-8">
      <div className="mb-6 flex items-center">
        <div className="flex items-center gap-2">
          <Icon className={`h-6 w-6 ${color}`} />
          <h2 className="text-2xl font-bold">{title}</h2>
        </div>
      </div>

      <div className="relative">
        <div className="flex gap-6">
          {services.map((service) => (
            <div 
              key={service.name} 
              className="group w-1/4 overflow-hidden rounded-lg bg-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
            >
              {/* Top part with service name - increased height to prevent cutting off */}
              <div className="flex h-20 items-center justify-center p-4">
                <h3 className="text-center text-xl font-bold">{service.name}</h3>
              </div>
              
              {/* Combined curved separator and price section */}
              <div className="relative bg-[#1a0f40]">
                {/* Curved part */}
                <div className="absolute -top-4 left-0 right-0 h-8 bg-white"
                  style={{
                    borderRadius: "0 0 100% 100%/0 0 100% 100%"
                  }}
                />
                
                {/* Price section - increased top padding to move price lower */}
                <div className="pt-4 pb-6 px-6">
                  <div className="flex flex-col items-center gap-1 text-white">
                    <div className="flex items-center">
                      <span className="text-2xl font-semibold">
                        {service.price.toFixed(2).replace('.', ',')}
                      </span>
                      <Euro className="h-5 w-5 ml-1" />
                    </div>
                    <span className="text-sm text-white/80">
                      {language === "en" ? "/month" : "/mois"}
                    </span>
                    {/* Join Button */}
                    <button 
                      className="mt-2 rounded bg-[#00E8DD] px-4 py-2 text-white hover:bg-[#00B2B2]"
                      onClick={() => {
                        // Open or minimize Tawk.to chat
                        if (window.Tawk_API) {
                          window.Tawk_API.toggle(); // This will open the chat
                        }
                      }}
                    >
                      Rejoindre
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )

  return (
    <div>
      {selectedCategory && <p>Selected Category: {selectedCategory}</p>}
      {Object.entries(groupedSubscriptions).map(([category, services]) => (
        <ServiceSection 
          key={category}
          title={language === "en" ? (category === "svod" ? "Video" : category === "music" ? "Music" : "Security") : (category === "svod" ? "Vidéo" : category === "music" ? "Musique" : "Sécurité")}
          icon={category === "svod" ? Popcorn : category === "music" ? Music2 : Lock}
          services={services}
          color={category === "svod" ? "text-[#FF4B81]" : category === "music" ? "text-[#FF4B81]" : "text-[#FF4B81]"}
          language={language}
        />
      ))}
    </div>
  )
})

ServiceCarousel.displayName = 'ServiceCarousel'

export default ServiceCarousel

