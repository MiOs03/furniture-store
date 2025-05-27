"use client"

import type React from "react"

import { useState } from "react"
import { Check, Ruler } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"
import { Product, CustomizationType } from "@/lib/types"

interface CustomDimensionsFormProps {
  productName: string
  product: Product
  onCustomizationChange?: (customizations: CustomizationType) => void
}

export default function CustomDimensionsForm({
  productName,
  product,
  onCustomizationChange,
}: CustomDimensionsFormProps) {
  const [dimensions, setDimensions] = useState({
    width: "",
    depth: "",
    height: "",
  })
  const [selectedColor, setSelectedColor] = useState("")
  const [selectedMaterial, setSelectedMaterial] = useState(product.materials?.[0] || "")
  const [contactInfo, setContactInfo] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleDimensionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setDimensions((prev) => {
      const newDimensions = { ...prev, [name]: value }
      updateCustomizations(selectedColor, selectedMaterial, newDimensions)
      return newDimensions
    })
  }

  const handleColorChange = (color: string) => {
    setSelectedColor(color)
    updateCustomizations(color, selectedMaterial, dimensions)
  }

  const handleMaterialChange = (material: string) => {
    setSelectedMaterial(material)
    updateCustomizations(selectedColor, material, dimensions)
  }

  const updateCustomizations = (
    color: string,
    material: string,
    dims: { width: string; depth: string; height: string },
  ) => {
    if (onCustomizationChange) {
      onCustomizationChange({
        color,
        material,
        dimensions: dims.width || dims.depth || dims.height ? dims : undefined,
      })
    }
  }

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setContactInfo((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Prepare email content
      const emailContent = {
        from: contactInfo.email,
        subject: `Zahtjev za prilagođene dimenzije - ${productName}`,
        text: `
          Novi zahtjev za prilagođene dimenzije:

          Proizvod: ${productName}
          
          Kontakt informacije:
          Ime: ${contactInfo.name}
          Email: ${contactInfo.email}
          Telefon: ${contactInfo.phone || 'Nije naveden'}
          
          Prilagođene dimenzije:
          Širina: ${dimensions.width || 'Nije navedena'} cm
          Dubina: ${dimensions.depth || 'Nije navedena'} cm
          Visina: ${dimensions.height || 'Nije navedena'} cm
          
          Boja: ${selectedColor || 'Nije navedena'}
          Materijal: ${selectedMaterial || 'Nije naveden'}
          
          Dodatne napomene:
          ${contactInfo.message || 'Nema dodatnih napomena'}
        `
      };

      // Send email
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailContent),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to send request');
      }

      setIsSubmitted(true);
      toast({
        title: "Zahtjev Poslan",
        description: "Hvala vam na zahtjevu. Naš tim će vas kontaktirati uskoro.",
      });

      // Reset form after submission
      setTimeout(() => {
        setIsDialogOpen(false);
        setIsSubmitted(false);
        setDimensions({ width: "", depth: "", height: "" });
        setContactInfo({ name: "", email: "", phone: "", message: "" });
      }, 2000);
    } catch (error: any) {
      toast({
        title: "Greška",
        description: error.message || "Došlo je do greške. Molimo pokušajte ponovo.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-6">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="custom-dimensions">
          <AccordionTrigger className="text-sm font-medium">
            <div className="flex items-center">
              <Ruler className="mr-2 h-4 w-4" />
              Customize Your {productName}
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-6">
              <p className="text-sm text-muted-foreground">
                Customize your {productName.toLowerCase()} to match your preferences and space requirements.
              </p>

              {/* Color Input */}
              <div>
                <h3 className="mb-3 text-sm font-medium">Color</h3>
                <div className="space-y-2">
                  <Label htmlFor="color">Specify your desired color</Label>
                  <Input
                    id="color"
                    name="color"
                    placeholder="e.g., Navy Blue, Forest Green, etc."
                    value={selectedColor}
                    onChange={(e) => handleColorChange(e.target.value)}
                  />
                </div>
              </div>

              {/* Material Options */}
              {product.materials && product.materials.length > 0 && (
                <div>
                  <h3 className="mb-3 text-sm font-medium">Material</h3>
                  <RadioGroup value={selectedMaterial} onValueChange={handleMaterialChange}>
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

              {/* Custom Dimensions */}
              <div>
                <h3 className="mb-3 text-sm font-medium">Custom Dimensions</h3>
                <p className="mb-3 text-sm text-muted-foreground">
                  Need specific dimensions? Enter your requirements below.
                </p>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="width">Width (cm)</Label>
                    <Input
                      id="width"
                      name="width"
                      type="number"
                      placeholder="e.g., 120"
                      value={dimensions.width}
                      onChange={handleDimensionChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="depth">Depth (cm)</Label>
                    <Input
                      id="depth"
                      name="depth"
                      type="number"
                      placeholder="e.g., 80"
                      value={dimensions.depth}
                      onChange={handleDimensionChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="height">Height (cm)</Label>
                    <Input
                      id="height"
                      name="height"
                      type="number"
                      placeholder="e.g., 75"
                      value={dimensions.height}
                      onChange={handleDimensionChange}
                    />
                  </div>
                </div>
              </div>

              {/* Request Custom Quote Button */}
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="mt-2">Request Custom Quote</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Request Custom {productName}</DialogTitle>
                    <DialogDescription>
                      Fill in your contact details and we'll get back to you with a quote for your customized product.
                    </DialogDescription>
                  </DialogHeader>

                  {!isSubmitted ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 gap-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Name</Label>
                          <Input
                            id="name"
                            name="name"
                            required
                            value={contactInfo.name}
                            onChange={handleContactChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={contactInfo.email}
                            onChange={handleContactChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone (optional)</Label>
                          <Input id="phone" name="phone" value={contactInfo.phone} onChange={handleContactChange} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="message">Additional Details (optional)</Label>
                          <Textarea
                            id="message"
                            name="message"
                            placeholder="Any specific requirements or questions?"
                            value={contactInfo.message}
                            onChange={handleContactChange}
                          />
                        </div>

                        <div className="rounded-md bg-stone-50 p-4">
                          <h4 className="mb-2 text-sm font-medium">Your Customizations</h4>
                          <div className="space-y-2 text-sm">
                            {selectedColor && (
                              <div>
                                <span className="text-muted-foreground">Color:</span> {selectedColor}
                              </div>
                            )}
                            {selectedMaterial && (
                              <div>
                                <span className="text-muted-foreground">Material:</span> {selectedMaterial}
                              </div>
                            )}
                            {(dimensions.width || dimensions.depth || dimensions.height) && (
                              <div className="mt-2 border-t pt-2">
                                <div className="font-medium">Custom Dimensions:</div>
                                <div className="grid grid-cols-3 gap-2">
                                  <div>
                                    <span className="text-muted-foreground">Width:</span> {dimensions.width || "—"} cm
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">Depth:</span> {dimensions.depth || "—"} cm
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">Height:</span> {dimensions.height || "—"} cm
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <DialogFooter>
                        <Button type="submit">Submit Request</Button>
                      </DialogFooter>
                    </form>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-10">
                      <div className="mb-4 rounded-full bg-green-100 p-3">
                        <Check className="h-6 w-6 text-green-600" />
                      </div>
                      <h3 className="mb-2 text-xl font-medium">Request Submitted</h3>
                      <p className="text-center text-muted-foreground">
                        Thank you! We've received your custom product request. Our team will contact you shortly with a
                        quote.
                      </p>
                    </div>
                  )}
                </DialogContent>
              </Dialog>

              <div className="mt-4 rounded-md bg-stone-50 p-4">
                <h4 className="mb-2 text-sm font-medium">Why Customize Your Furniture?</h4>
                <ul className="ml-5 list-disc space-y-1 text-sm text-muted-foreground">
                  <li>Perfect fit for your specific space</li>
                  <li>Choose materials and colors that match your interior</li>
                  <li>Same high-quality materials and craftsmanship</li>
                  <li>Personalized service from our design team</li>
                </ul>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
