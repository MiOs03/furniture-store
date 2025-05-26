import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import ProductCard from "./product-card"

export default function FeaturedProducts() {
  // Sample featured products
  const featuredProducts = [
    {
      id: 1,
      name: "Oslo Lounge Chair",
      price: 1299,
      description: "Comfortable lounge chair with solid oak frame and wool upholstery.",
      category: "living-room",
      image: "/placeholder.svg?height=600&width=600",
    },
    {
      id: 2,
      name: "Bergen Dining Table",
      price: 1899,
      description: "Extendable dining table in solid oak with smooth edges and natural finish.",
      category: "dining",
      image: "/placeholder.svg?height=600&width=600",
    },
    {
      id: 3,
      name: "Stockholm Bed Frame",
      price: 2499,
      description: "King-size bed frame with integrated nightstands and LED lighting.",
      category: "bedroom",
      image: "/placeholder.svg?height=600&width=600",
    },
    {
      id: 4,
      name: "Fjord Desk",
      price: 1199,
      description: "Minimalist desk with cable management and adjustable height.",
      category: "office",
      image: "/placeholder.svg?height=600&width=600",
    },
  ]

  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h2 className="text-3xl font-light tracking-tight sm:text-4xl">Istaknuti proizvodi</h2>
            <p className="text-muted-foreground">Pogledajte naše najpopularnije proizvode</p>
          </div>
          <Button asChild variant="ghost" className="group">
            <Link href="/products">
              Pogledajte sve proizvode <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
