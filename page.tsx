"use client"

import { Grid, MessageSquare, Search as SearchIcon } from "lucide-react"
import Link from "next/link"
import CategoryNav from "./category-nav"
import ServiceCarousel from "./service-carousel"
import { useState, useRef } from "react"
import TawkMessengerReact from '@tawk.to/tawk-messenger-react';
import { useUserStore } from "./stores/userStore";

export default function Page() {
  const carouselRef = useRef(null)
  const tawkMessengerRef = useRef(null)
  const { userData } = useUserStore();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [language, setLanguage] = useState("en"); // Default language is English
  const [searchQuery, setSearchQuery] = useState(''); // State for search query

  const handleSearch = (query: string) => {
    if (carouselRef.current) {
      // @ts-ignore
      carouselRef.current.filterServices(query)
    }
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    handleSearch(query); // Call the filter function
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "fr" : "en")); // Toggle between English and French
  };

  const onTawkLoad = () => {
    console.log("Tawk.to widget loaded");

    if (window.Tawk_API) {
      const userName = userData.full_name;
      const userEmail = userData.email;
      const userPhone = userData.phone_number;

      window.Tawk_API.setAttributes({
        name: userName,
        email: userEmail,
        phone: userPhone,
      }, function (error: any) {
        if (error) {
          console.error("Error setting Tawk.to user details:", error);
        } else {
          console.log("User details successfully sent to Tawk.to");
        }
      });

      window.Tawk_API.visitor = {
        name: userName,
        email: userEmail,
      };
    } else {
      console.error("Tawk_API is not available");
    }
  };

  return (
    <div className="min-h-screen bg-[#1a0f40]">
      <header className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-12">
          {/* Text Logo with Color #00E8DD */}
          <Link href="/" className="text-[#00E8DD] text-2xl font-bold">Sub4you</Link>
        </div>

        {/* Navigation Links and Language Toggle at the top right */}
        <div className="flex items-center gap-4">
          <Link href="/subscriptions" className="flex flex-col items-center text-white/80 hover:text-white">
            <Grid className="h-6 w-6" />
            <span className="text-sm">Accueil</span>
          </Link>
          
          <Link href="/about" className="flex flex-col items-center text-white">
            <SearchIcon className="h-6 w-6" />
            <span className="text-sm">À propos de nous</span>
          </Link>

          {/* Language Toggle with Flags */}
          <button 
            onClick={toggleLanguage} 
            className="flex items-center bg-[#1a0f40] px-4 py-2 rounded hover:bg-[#00B2B2]"
          >
            {language === "en" ? (
              <img src="/uk.png" alt="English" className="h-5 w-5 mr-2" />
            ) : (
              <img src="/fr.png" alt="Français" className="h-5 w-5 mr-2" />
            )}
          </button>
        </div>
      </header>

      {/* Search Bar */}
      <div className="mb-4 w-full max-w-md mx-auto"> {/* Center the search bar */}
        <input 
          type="text" 
          value={searchQuery} 
          onChange={handleSearchChange} 
          placeholder="Rechercher un abonnement"
          className="border rounded p-2 w-full"
        />
      </div>

      <CategoryNav />

      <main className="relative bg-white pt-16">
        <div
          className="absolute inset-x-0 -top-8 h-16 bg-[#1a0f40]"
          style={{
            borderRadius: "0 0 100% 100%/0 0 100px 100px",
          }}
        />

        <div className="container mx-auto px-4">
          <ServiceCarousel ref={carouselRef} selectedCategory={selectedCategory} language={language} />
        </div>
      </main>

      <TawkMessengerReact
        propertyId="67be12d987b472191189bb6f"
        widgetId="1ikv7j8uq"
        ref={tawkMessengerRef}
        onLoad={onTawkLoad}
      />
    </div>
  )
}

