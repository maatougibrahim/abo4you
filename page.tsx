"use client"

import { Grid, Search as SearchIcon } from "lucide-react"
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

  const openChat = () => {
    if (window.Tawk_API) {
      window.Tawk_API.toggle(); // This will open the chat
    }
  };

  return (
    <div className="min-h-screen bg-[#1a0f40]">
      <header className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-12">
          {/* Text Logo with Color #00E8DD */}
          <Link href="/" className="text-[#00E8DD] text-3xl font-bold">Sub4you</Link>
        </div>

        {/* Language Toggle with Flags */}
        <div className="flex items-center gap-4">
          {/* Centered Facebook Redirect Button */}
          <Link href="https://www.facebook.com/profile.php?id=61573834613741" target="_blank" className="flex flex-col items-center text-white/80 hover:text-white">
            <img src="/facebook-logo.png" alt="Facebook" className="h-10 w-10" /> {/* Increased size by 80% */}
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
      <div className="mb-2 w-full max-w-md mx-auto"> {/* Reduced margin to bring CategoryNav closer */}
        <input 
          type="text" 
          value={searchQuery} 
          onChange={handleSearchChange} 
          placeholder="Rechercher un abonnement"
          className="border rounded p-2 w-full"
        />
      </div>

      <CategoryNav />

      <main className="relative bg-white pt-16 mt-16" >
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

      {/* New Section for Welcome Message */}
      <div className="bg-[#1a0f40] text-white text-center p-6">
        <h2 className="text-lg font-bold">Bienvenue sur Sub4You</h2>
        <p className="mt-2">
          La plateforme qui vous permet de profiter de vos services préférés à moindre coût grâce au partage d'abonnements !
        </p>
        <p className="mt-2">
          Nous savons que de nombreux abonnements proposent des formules familiales avec plusieurs places disponibles. Mais pourquoi payer plus cher quand vous pouvez partager ces abonnements ? Sub4You vous permet de trouver ou proposer des places individuelles sur des abonnements familiaux à des prix avantageux, tout en respectant les conditions des fournisseurs.
        </p>
        <p className="mt-2">
          Que vous souhaitiez optimiser votre abonnement en partageant des places non utilisées ou que vous cherchiez à accéder à vos services préférés sans payer le plein tarif, Sub4You est la solution idéale.
        </p>
        <p className="mt-2">
          Nous vous offrons une flexibilité totale : les places sont disponibles avec un paiement mensuel ou pour une plus longue période, selon votre préférence.
        </p>
        <p className="mt-2">
          📩 Une question ? Besoin d'aide ? Contactez-nous directement via le <span onClick={openChat} className="text-blue-400 cursor-pointer">chat</span> (en bas à droite), sur facebook <Link href="https://www.facebook.com/profile.php?id=61573834613741" target="_blank"><img src="/facebook-logo.png" alt="Facebook" className="inline h-9 w-9 ml-0" /></Link> ou par mail à: <a href="mailto:contact@sub4you.be" className="text-blue-400">contact@sub4you.be</a> !
        </p>
        <p className="mt-2">
          Rejoignez-nous dès maintenant et économisez sur vos abonnements ! 🚀
        </p>
      </div>

      <TawkMessengerReact
        propertyId="67be12d987b472191189bb6f"
        widgetId="1ikv7j8uq"
        ref={tawkMessengerRef}
        onLoad={onTawkLoad}
      />
    </div>
  )
}

