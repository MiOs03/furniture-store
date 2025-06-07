"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { AddToCartButton } from "@/components/cart/add-to-cart-button"
import { useState } from "react"

interface ProductCardProps {
  product: {
    id: string | number
    naziv: string
    cijena: number
    staraCijena?: number
    opis: string
    kategorije: string[]
    slika: string
    slike?: string[]
    ocjena?: number
    brojRecenzija?: number
    jeNov?: boolean
    istaknut?: boolean
    slug?: string
  }
}

export default function ProductCard({ product }: ProductCardProps) {
  const [imgSrc, setImgSrc] = useState(product.slika || "/placeholder.svg")
  const discount = product.staraCijena 
    ? Math.round(((product.staraCijena - product.cijena) / product.staraCijena) * 100)
    : 0

  let imageUrl = imgSrc.startsWith('/') ? imgSrc : `/images/products/${imgSrc}`;
  if (!imgSrc) {
    imageUrl = "/placeholder.svg";
  }

  // Convert product ID to number for AddToCartButton
  const productForCart = {
    ...product,
    id: typeof product.id === 'string' ? parseInt(product.id, 10) : product.id
  };

  return (
    <Link 
      href={`/products/${product.slug || String(product.id)}`}
      className="block h-full"
      aria-label={`View details for ${product.naziv}`}
    >
      <Card className="group h-full overflow-hidden rounded-lg border-none bg-surface transition-all duration-300 hover:shadow-lg">
        <div className="relative aspect-square">
          <img
            src={imageUrl}
            alt={product.naziv}
            onError={() => setImgSrc("/placeholder.svg")}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
          />
          {product.staraCijena && (
            <span 
              className="absolute right-2 top-2 rounded bg-accent px-2 py-1 text-xs font-medium text-white"
              aria-label={`- ${discount} %`}
            >
              - {discount} %
            </span>
          )}
        </div>
        <CardContent className="flex h-full flex-col justify-between p-4">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="text-lg font-bold text-primary">{product.cijena.toLocaleString()} KM</span>
              {product.staraCijena && (
                <span className="text-sm text-muted-foreground line-through">
                  {product.staraCijena.toLocaleString()} KM
                </span>
              )}
            </div>
            <h3 className="mb-1 text-lg font-medium line-clamp-1">{product.naziv}</h3>
            <p className="mb-2 line-clamp-2 text-sm text-muted-foreground">{product.opis}</p>
          </div>
          <div className="flex items-center justify-between gap-2">
            <div className="opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              <AddToCartButton 
                product={productForCart}
                variant="secondary"
                size="sm"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}