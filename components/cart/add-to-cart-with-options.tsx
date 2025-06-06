"use client"

import { useState } from "react"
import { ShoppingBag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/contexts/cart-context"
import { useToast } from "@/components/ui/use-toast"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AddToCartWithOptionsProps {
  productId: string | number
  name: string
  price: number
  image: string
  colors: string[]
  materials: string[]
  dimensions: string[]
  buttonClassName?: string
  'aria-label'?: string
}

export default function AddToCartWithOptions({
  productId,
  name,
  price,
  image,
  colors,
  materials,
  dimensions,
  buttonClassName,
}: AddToCartWithOptionsProps) {
  const { addToCart } = useCart()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const handleAddToCart = async () => {
    setIsLoading(true)
    try {
      await addToCart({
        id: String(productId),
        name,
        price,
        image,
        quantity: 1,
        customizations: {
          color: colors[0],
          material: materials[0],
        },
      })
      toast({
        title: "Proizvod dodan u korpu",
        description: `${name} je uspješno dodan u vašu korpu.`,
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
    <div className="space-y-6">
      <Button 
        onClick={handleAddToCart}
        disabled={isLoading}
        className={buttonClassName || "w-full"}
      >
        <ShoppingBag className="mr-2 h-4 w-4" />
        {isLoading ? "Dodavanje..." : "Dodaj u Korpu"}
      </Button>
    </div>
  )
}
