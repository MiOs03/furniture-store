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
import { Product } from "@/lib/types"

interface CustomDimensionsFormProps {
  productName: string
  product: Product
}

export default function CustomDimensionsForm({
  productName,
  product,
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
    setDimensions((prev) => ({ ...prev, [name]: value }))
  }

  const handleColorChange = (color: string) => {
    setSelectedColor(color)
  }

  const handleMaterialChange = (material: string) => {
    setSelectedMaterial(material)
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
          <AccordionTrigger className="h-16 px-6 text-lg font-medium flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-black transition-all duration-200">
            <Ruler className="h-5 w-5 mr-2" />
            <span className="flex-1 text-left">Prilagodi dimenzije {productName}</span>
          </AccordionTrigger>
          <AccordionContent className="bg-white p-6 rounded-b-xl">
            <div className="space-y-6">
              <p className="text-sm text-muted-foreground">
                Prilagodite {productName.toLowerCase()} prema svojim potrebama i prostoru.
              </p>

              {/* Color Input */}
              <div>
                <h3 className="mb-3 text-sm font-medium">Boja</h3>
                <div className="space-y-2">
                  <Label htmlFor="color">Odaberite željenu boju</Label>
                  <Input
                    id="color"
                    name="color"
                    placeholder="e.g., Plava, Zelena, itd."
                    value={selectedColor}
                    onChange={(e) => handleColorChange(e.target.value)}
                  />
                </div>
              </div>

              {/* Material Options */}
              {product.materials && product.materials.length > 0 && (
                <div>
                  <h3 className="mb-3 text-sm font-medium">Materijal</h3>
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
                <h3 className="mb-3 text-sm font-medium">Prilagođene dimenzije</h3>
                <p className="mb-3 text-sm text-muted-foreground">
                  Trebate specifične dimenzije? Unesite svoje zahtjeve ispod.
                </p>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="width">Širina (cm)</Label>
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
                    <Label htmlFor="depth">Dubina (cm)</Label>
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
                    <Label htmlFor="height">Visina (cm)</Label>
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
                  <Button className="mt-2">Zatraži prilagođenu ponudu</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Zatraži prilagođenu ponudu za {productName}</DialogTitle>
                    <DialogDescription>
                      Popunite svoje kontakt informacije i mi ćemo vam poslati ponudu za vaš prilagođeni proizvod.
                    </DialogDescription>
                  </DialogHeader>

                  {!isSubmitted ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 gap-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Ime</Label>
                          <Input
                            id="name"
                            name="name"
                            required
                            value={contactInfo.name}
                            onChange={handleContactChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email adresa</Label>
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
                          <Label htmlFor="phone">Telefon (neobavezno)</Label>
                          <Input id="phone" name="phone" value={contactInfo.phone} onChange={handleContactChange} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="message">Dodatne informacije (neobavezno)</Label>
                          <Textarea
                            id="message"
                            name="message"
                            placeholder="Bilo koje specifične zahtjeve ili pitanja?"
                            value={contactInfo.message}
                            onChange={handleContactChange}
                          />
                        </div>

                        <div className="rounded-md bg-stone-50 p-4">
                          <h4 className="mb-2 text-sm font-medium">Vaše prilagođenosti</h4>
                          <div className="space-y-2 text-sm">
                            {selectedColor && (
                              <div>
                                <span className="text-muted-foreground">Boja:</span> {selectedColor}
                              </div>
                            )}
                            {selectedMaterial && (
                              <div>
                                <span className="text-muted-foreground">Materijal:</span> {selectedMaterial}
                              </div>
                            )}
                            {(dimensions.width || dimensions.depth || dimensions.height) && (
                              <div className="mt-2 border-t pt-2">
                                <div className="font-medium">Prilagođene dimenzije:</div>
                                <div className="grid grid-cols-3 gap-2">
                                  <div>
                                    <span className="text-muted-foreground">Širina:</span> {dimensions.width || "—"} cm
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">Dubina:</span> {dimensions.depth || "—"} cm
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">Visina:</span> {dimensions.height || "—"} cm
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <DialogFooter>
                        <Button type="submit">Pošalji zahtjev</Button>
                      </DialogFooter>
                    </form>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-10">
                      <div className="mb-4 rounded-full bg-green-100 p-3">
                        <Check className="h-6 w-6 text-green-600" />
                      </div>
                      <h3 className="mb-2 text-xl font-medium">Zahtjev poslat</h3>
                      <p className="text-center text-muted-foreground">
                        Hvala! Mi smo primili vaš zahtjev za prilagođeni proizvod. Naš tim će vas kontaktirati uskoro sa ponudom.
                      </p>
                    </div>
                  )}
                </DialogContent>
              </Dialog>

              <div className="mt-4 rounded-md bg-stone-50 p-4">
                <h4 className="mb-2 text-sm font-medium">Zašto prilagoditi namještaj?</h4>
                <ul className="ml-5 list-disc space-y-1 text-sm text-muted-foreground">
                  <li>Savršen prilagod za vaš specifični prostor</li>
                  <li>Odaberite materijale i boje koje odgovaraju vašem interijeru</li>
                  <li>Iste visoke kvalitete materijala i izrade</li>
                  <li>Prilagođena usluga od našeg tima dizajnera</li>
                </ul>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
