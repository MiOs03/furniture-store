"use client"

import { useState } from "react"
import Image from "next/image"
import { Check } from "lucide-react"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface ProductCustomizationProps {
  product: {
    colors?: { name: string; hex: string }[]
    materials?: string[]
    dimensions?: { name: string; value: string }[]
    // Add other customization options as needed
  }
}

export default function ProductCustomization({ product }: ProductCustomizationProps) {
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]?.name || "")
  const [selectedMaterial, setSelectedMaterial] = useState(product.materials?.[0] || "")
  const [selectedSize, setSelectedSize] = useState("Standard")

  // Additional customization options
  const sizes = ["Small", "Standard", "Large"]
  const additionalOptions = [
    {
      name: "Cushion Firmness",
      options: ["Soft", "Medium", "Firm"],
      images: [
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
      ],
    },
    {
      name: "Leg Style",
      options: ["Tapered", "Straight", "Round"],
      images: [
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
      ],
    },
  ]

  return (
    <div className="space-y-6">
      {/* Color Options */}
      {product.colors && product.colors.length > 0 && (
        <div>
          <h3 className="mb-3 text-sm font-medium">Color</h3>
          <div className="flex space-x-2">
            {product.colors.map((color) => (
              <button
                key={color.name}
                className={`h-8 w-8 rounded-full border ${
                  selectedColor === color.name ? "ring-2 ring-black ring-offset-2" : ""
                }`}
                style={{ backgroundColor: color.hex }}
                onClick={() => setSelectedColor(color.name)}
                aria-label={color.name}
              >
                {selectedColor === color.name && (
                  <Check className={`h-4 w-4 ${color.name === "White" ? "text-black" : "text-white"}`} />
                )}
              </button>
            ))}
          </div>
          <p className="mt-2 text-sm text-muted-foreground">{selectedColor}</p>
        </div>
      )}

      {/* Material Options */}
      {product.materials && product.materials.length > 0 && (
        <div>
          <h3 className="mb-3 text-sm font-medium">Material</h3>
          <RadioGroup value={selectedMaterial} onValueChange={setSelectedMaterial}>
            <div className="flex flex-wrap gap-2">
              {product.materials.map((material) => (
                <div key={material} className="flex items-center">
                  <RadioGroupItem value={material} id={`material-${material}`} className="sr-only" />
                  <Label
                    htmlFor={`material-${material}`}
                    className={`rounded-md border px-3 py-1 text-sm ${
                      selectedMaterial === material
                        ? "border-black bg-black text-white"
                        : "text-muted-foreground hover:border-black"
                    }`}
                  >
                    {material}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>
      )}

      {/* Size Options */}
      <div>
        <h3 className="mb-3 text-sm font-medium">Size</h3>
        <RadioGroup value={selectedSize} onValueChange={setSelectedSize}>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <div key={size} className="flex items-center">
                <RadioGroupItem value={size} id={`size-${size}`} className="sr-only" />
                <Label
                  htmlFor={`size-${size}`}
                  className={`rounded-md border px-3 py-1 text-sm ${
                    selectedSize === size
                      ? "border-black bg-black text-white"
                      : "text-muted-foreground hover:border-black"
                  }`}
                >
                  {size}
                </Label>
              </div>
            ))}
          </div>
        </RadioGroup>
      </div>

      {/* Additional Customization Options */}
      <Accordion type="single" collapsible className="w-full">
        {additionalOptions.map((option, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-sm font-medium">{option.name}</AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-3 gap-4">
                {option.options.map((opt, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className="mb-2 overflow-hidden rounded-md border">
                      <Image
                        src={option.images[i] || "/placeholder.svg"}
                        alt={opt}
                        width={100}
                        height={100}
                        className="h-auto w-full object-cover"
                      />
                    </div>
                    <span className="text-sm">{opt}</span>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
