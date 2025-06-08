"use client"

import { Product } from "@/lib/products"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { formatPrice } from "@/lib/utils"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/lib/contexts/cart-context"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()

  // Ensure we have a valid image URL
  const getValidImageUrl = (image: string | undefined) => {
    if (!image) return "/placeholder.svg"
    if (image.startsWith("http")) return image
    if (image.startsWith("/")) return image
    return `/images/products/${image}`
  }

  const imageUrl = getValidImageUrl(product.slika)

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-stone-50">
          <Image
            src={imageUrl}
            alt={`${product.naziv} - ${product.opis}`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <CardContent className="p-4">
          <h3 className="mb-2 text-lg font-medium transition-colors group-hover:text-primary">
            {product.naziv}
          </h3>
          <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
            {product.opis}
          </p>
          <div className="flex items-center justify-between">
            <div className="text-lg font-medium">
              {formatPrice(product.cijena)}
              {product.staraCijena && (
                <span className="ml-2 text-sm text-muted-foreground line-through">
                  {formatPrice(product.staraCijena)}
                </span>
              )}
            </div>
          </div>
        </CardContent>
      </Link>
      <CardFooter className="p-4 pt-0">
        <Button
          onClick={() => addToCart({
            id: String(product.id),
            name: product.naziv,
            price: product.cijena,
            image: imageUrl,
            quantity: 1,
            customizations: {
              colors: product.boje,
              materials: product.materijali,
              dimensions: product.dimenzije,
            },
          })}
          className="w-full transition-all duration-300 hover:scale-[1.02]"
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Dodaj u korpu
        </Button>
      </CardFooter>
    </Card>
  )
}