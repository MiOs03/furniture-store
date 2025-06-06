import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import FeaturedProducts from "@/components/sections/featured-products"
import BrandIntro from "@/components/sections/brand-intro"
import NewProducts from "@/components/sections/new-products"
import AboutUsPreview from "@/components/sections/about-us-preview"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section with Sales Banner */}
        <section className="relative h-[70vh] min-h-[320px] sm:min-h-[400px] w-full" aria-label="Hero section">
          <Image
            src="/proba1.jpeg?height=1080&width=1920"
            alt="Elegantna dnevna soba sa minimalističkim namještajem"
            fill
            priority
            sizes="100vw"
            className="object-cover"
            quality={90}
          />
          <div className="absolute inset-0 bg-black/30" aria-hidden="true" />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center text-white select-none">
            <div className="mb-6 rounded-md bg-black/60 px-4 py-2 sm:px-6 sm:py-3 backdrop-blur-sm">
              <p className="text-base font-medium uppercase tracking-wider sm:text-lg md:text-xl">Ljetnja Akcija</p>
              <p className="text-xl font-light sm:text-2xl md:text-3xl">Do 30% popusta na odabrane proizvode</p>
            </div>
            <h1 className="mb-4 max-w-3xl text-3xl font-light tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              VSistem
            </h1>
            <p className="mb-8 max-w-xl text-base font-light sm:text-lg md:text-xl">
              Namještaj po mjeri
            </p>
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Button 
                asChild 
                size="lg" 
                className="group relative overflow-hidden rounded-md border-2 border-white bg-transparent text-white hover:bg-white hover:text-black transition-all duration-300"
              >
                <Link href="/products" className="flex items-center">
                  <span className="relative z-10 flex items-center">
                    Pogledaj proizvode
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* About Us Preview Section */}
        <AboutUsPreview />

        {/* New Products */}
        <NewProducts />

        {/* Featured Products */}
        <FeaturedProducts />

        {/* Brand Intro */}
        <BrandIntro />
      </main>
      <Footer />
    </div>
  )
}
