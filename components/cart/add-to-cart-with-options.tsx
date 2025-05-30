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
  productId: number
  name: string
  price: number
  image: string
  colors: string[]
  materials: string[]
  dimensions: string[]
}

export default function AddToCartWithOptions({
  productId,
  name,
  price,
  image,
  colors,
  materials,
  dimensions,
}: AddToCartWithOptionsProps) {
  const { addToCart } = useCart()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [selectedColor, setSelectedColor] = useState(colors[0])
  const [selectedMaterial, setSelectedMaterial] = useState(materials[0])

  const handleAddToCart = async () => {
    setIsLoading(true)
    try {
      await addToCart({
        id: productId,
        name,
        price,
        image,
        quantity: 1,
        customizations: {
          color: selectedColor,
          material: selectedMaterial,
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
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Boja</Label>
          <RadioGroup
            value={selectedColor}
            onValueChange={setSelectedColor}
            className="flex flex-wrap gap-2"
          >
            {colors.map((color) => (
              <div key={color} className="flex items-center space-x-2">
                <RadioGroupItem value={color} id={`color-${color}`} />
                <Label htmlFor={`color-${color}`}>{color}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label>Materijal</Label>
          <Select value={selectedMaterial} onValueChange={setSelectedMaterial}>
            <SelectTrigger>
              <SelectValue placeholder="Odaberite materijal" />
            </SelectTrigger>
            <SelectContent>
              {materials.map((material) => (
                <SelectItem key={material} value={material}>
                  {material}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

        <Button 
          onClick={handleAddToCart}
        disabled={isLoading}
        className="w-full"
        >
        <ShoppingBag className="mr-2 h-4 w-4" />
        {isLoading ? "Dodavanje..." : "Dodaj u Korpu"}
        </Button>
    </div>
  )
}
