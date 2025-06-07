"use client"

import { useAllProducts } from "@/lib/products"
import ProductCard from "./product-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function FeaturedProducts() {
  const { products, loading, error } = useAllProducts()
  const featuredProducts = products.filter((p) => p.istaknut)

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
        {loading ? (
          <div className="py-12 text-center">Učitavanje...</div>
        ) : error ? (
          <div className="py-12 text-center text-red-500">{error}</div>
        ) : featuredProducts.length === 0 ? (
          <div className="py-12 text-center text-muted-foreground">Nema istaknutih proizvoda.</div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
