"use client"

import { useState } from "react"
import { ShoppingBag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/contexts/cart-context"
import { useToast } from "@/components/ui/use-toast"

interface AddToCartButtonProps {
  product: {
    id: number
    name: string
    price: number
    image: string
    color?: string
    material?: string
    dimensions?: {
      width?: number
      height?: number
      depth?: number
    }
  }
  variant?: "default" | "secondary" | "outline" | "ghost"
  size?: "default" | "sm" | "lg"
}

export function AddToCartButton({
  product,
  variant = "default",
  size = "default",
}: AddToCartButtonProps) {
  const { addItem } = useCart()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const handleAddToCart = async () => {
    setIsLoading(true)
    try {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
        color: product.color,
        material: product.material,
        dimensions: product.dimensions,
      })
      toast({
        title: "Proizvod dodan u korpu",
        description: `${product.name} je uspješno dodan u vašu korpu.`,
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
