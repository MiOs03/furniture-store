import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import ProductCard from "./product-card"

export default function NewProducts() {
  // Sample new products
  const newProducts = [
    {
      id: 9,
      name: "Helsingborg Coffee Table",
      price: 799,
      description: "Minimalist coffee table with marble top and solid oak legs.",
      category: "living-room",
      image: "/placeholder.svg?height=600&width=600",
    },
    {
      id: 10,
      name: "Kiruna Floor Lamp",
      price: 349,
      oldPrice: 449,
      description: "Adjustable floor lamp with brass details and linen shade.",
      category: "lighting",
      image: "/placeholder.svg?height=600&width=600",
    },
    {
      id: 11,
      name: "Luleå Side Table",
      price: 399,
      description: "Versatile side table with hidden storage compartment.",
      category: "living-room",
      image: "/placeholder.svg?height=600&width=600",
    },
    {
      id: 12,
      name: "Umeå Wall Shelf",
      price: 249,
      description: "Floating wall shelf with integrated wireless charging.",
      category: "storage",
      image: "/placeholder.svg?height=600&width=600",
    },
  ]

  return (
    <section className="bg-stone-50 py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h2 className="text-3xl font-light tracking-tight sm:text-4xl">Novi proizvodi</h2>
            <p className="text-muted-foreground">Pogledajte naše najnovije proizvode</p>
          </div>
          <Button asChild variant="ghost" className="group">
            <Link href="/products?category=new">
              Pogledajte nove proizvode {" "}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {newProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
