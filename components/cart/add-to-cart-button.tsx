"use client"

import { useState } from "react"
import { ShoppingBag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/contexts/cart-context"
import { useToast } from "@/components/ui/use-toast"

interface AddToCartButtonProps {
  product: {
    id: string | number
    naziv: string
    cijena: number
    slika: string
    boje?: { naziv: string; hex: string }[]
    materijali?: string[]
    dimenzije?: { naziv: string; vrijednost: string }[]
  }
  variant?: "default" | "secondary" | "outline" | "ghost"
  size?: "default" | "sm" | "lg"
}

export function AddToCartButton({
  product,
  variant = "default",
  size = "default",
}: AddToCartButtonProps) {
  const { addToCart } = useCart()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const handleAddToCart = async () => {
    setIsLoading(true)
    try {
      addToCart({
        id: String(product.id),
        name: product.naziv,
        price: product.cijena,
        image: product.slika,
        quantity: 1,
        customizations: {
          colors: product.boje,
          materials: product.materijali,
          dimensions: product.dimenzije,
        },
      })
      toast({
        title: "Proizvod dodan u korpu",
        description: `${product.naziv} je uspješno dodan u vašu korpu.`,
      })
    } catch (error) {
      toast({
        title: "Greška",
        description: "Došlo je do greške prilikom dodavanja proizvoda u korpu.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      onClick={handleAddToCart}
      disabled={isLoading}
      variant={variant}
      size={size}
    >
      <ShoppingBag className="mr-2 h-4 w-4" />
      {isLoading ? "Dodavanje..." : "Dodaj u Korpu"}
    </Button>
  )
}
