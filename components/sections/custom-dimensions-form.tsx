"use client"

import type React from "react"
import { useState, useRef } from "react"
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
  const [selectedMaterial, setSelectedMaterial] = useState("")
  const [contactInfo, setContactInfo] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [punjenje, setPunjenje] = useState("")
  const [opcije, setOpcije] = useState<string[]>([])
  const [madracOpcija, setMadracOpcija] = useState("")
  const [krevetOpcija, setKrevetOpcija] = useState("")
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  // Fixed list of materials
  const availableMaterials = ["Mebl štof", "Pliš", "Eko koža", "Skaj", "Prava koža"]

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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setUploadedImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveImage = () => {
    setUploadedImage(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Compose extra fields for email based on category
    let extraFields = '';
    if (isKrevet) {
      extraFields += `\n  Opcija Madraca: ${madracOpcija || 'Nije odabrano'}`;
      extraFields += `\n  Opcije kreveta: ${krevetOpcija || 'Nije odabrano'}`;
    }
    if (isUgaonaOrTdf) {
      extraFields += `\n  Punjenje: ${punjenje || 'Nije odabrano'}`;
      extraFields += `\n  Opcije: ${(opcije[0] || 'Nije odabrano')}`;
    }
    if (uploadedImage) {
      extraFields += `\n  Skica proizvoda: [slika priložena kao base64]`;
    }
    if (isStol) {
      // No extra fields for stol
    }
    if (isStolica) {
      // No extra fields for stolica
    }

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
${extraFields}
  
  Dodatne napomene:
    ${contactInfo.message || 'Nema dodatnih napomena'}
        `,
        image: uploadedImage || undefined,
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

  // CATEGORY-SPECIFIC FORM RENDERING
  const isStol = product.category === "stol"
  const isStolica = product.category === "stolica"
  const isUgaonaOrTdf = product.category === "ugaona-garnitura" || product.category === "tdf"
  const isKrevet = product.category === "krevet"

  // Helper for Opcije
  const handleOpcijaChange = (value: string) => {
    setOpcije((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    )
  }

  // Validation logic for enabling/disabling send buttons
  const isFormValid = (() => {
    if (isStol) {
      return selectedColor.trim() && dimensions.width && dimensions.depth && dimensions.height;
    }
    if (isStolica) {
      return selectedColor.trim() && selectedMaterial;
    }
    if (isUgaonaOrTdf) {
      return selectedColor.trim() && selectedMaterial && punjenje && dimensions.width && dimensions.depth && dimensions.height && opcije[0];
    }
    if (isKrevet) {
      return selectedColor.trim() && selectedMaterial && madracOpcija && krevetOpcija && dimensions.width && dimensions.depth && dimensions.height;
    }
    // Default: require color and material and dimensions
    return selectedColor.trim() && selectedMaterial && dimensions.width && dimensions.depth && dimensions.height;
  })();

  return (
    <div className="mt-6">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="custom-dimensions">
          <AccordionTrigger className="h-16 px-6 text-lg font-medium flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-black transition-all duration-200">
            <Ruler className="h-5 w-5 mr-2" />
            <span className="flex-1 text-left">Kreiraj po sopstvenoj mjeri {productName}</span>
          </AccordionTrigger>
          <AccordionContent className="bg-white p-6 rounded-b-xl">
            <div className="space-y-6">
              <p className="text-sm text-muted-foreground">
                Prilagodite {productName.toLowerCase()} prema svojim potrebama i prostoru.
              </p>

              {/* CATEGORY: STOL (TABLES) - ONLY COLOR AND DIMENSIONS */}
              {isStol ? (
                <>
                  {/* Color Input */}
                  <div>
                    <h3 className="mb-3 text-sm font-medium">Unesite RAL šifru željene boje</h3>
                    <div className="space-y-2">
                      <div className="flex flex-col sm:flex-row gap-2">
                        <div className="flex-1 flex flex-col justify-end">
                          <Input
                            id="color"
                            name="color"
                            placeholder="npr. RAL 1000, RAL 1001, itd."
                            value={selectedColor}
                            onChange={(e) => setSelectedColor(e.target.value)}
                            className="w-full h-11 rounded-lg px-3 py-2 border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent-purple"
                          />
                        </div>
                        <div className="flex items-end sm:w-1/2">
                          <a
                            href="https://www.coexpert.ba/index.php/2-uncategorised/2-ral"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto h-11 flex items-center justify-center px-4 rounded-lg bg-primary border border-primary text-white font-semibold shadow transition text-center hover:bg-accent-purple hover:border-accent-purple hover:text-white focus:outline-none focus:ring-2 focus:ring-accent-purple"
                            style={{ minWidth: 'max-content' }}
                          >
                            Šifre svih RAL boja
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Custom Dimensions */}
                  <div>
                    <h3 className="mb-3 text-sm font-medium">Prilagođene dimenzije</h3>
                    <div className="mb-3 flex justify-center">
                      <img
                        src="https://via.placeholder.com/192x192?text=Skica"
                        alt="Skica dimenzija proizvoda"
                        className="w-48 h-48 object-contain rounded border bg-stone-100"
                      />
                    </div>
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
                      <Button className="mt-2" disabled={!isFormValid}>Zatraži prilagođenu ponudu</Button>
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
                            <Button type="submit" disabled={!isFormValid}>Pošalji zahtjev</Button>
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
                </>
              ) : isStolica ? (
                // CATEGORY: STOLICA (CHAIRS) - ONLY MATERIAL AND COLOR
                <>
                  {/* Color Input */}
                  <div>
                    <h3 className="mb-3 text-sm font-medium">Unesite šifru željene boje</h3>
                    <div className="space-y-2">
                      <div className="flex flex-col sm:flex-row gap-2">
                        <div className="flex-1 flex flex-col justify-end">
                          <Input
                            id="color"
                            name="color"
                            placeholder="npr. Atakama 100, Berry 199, itd."
                            value={selectedColor}
                            onChange={(e) => setSelectedColor(e.target.value)}
                            className="w-full h-11 rounded-lg px-3 py-2 border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent-purple"
                          />
                        </div>
                        <div className="flex items-end sm:w-1/2">
                          <a
                            href="https://lion-fabrics.com/collections/all"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto h-11 flex items-center justify-center px-4 rounded-lg bg-primary border border-primary text-white font-semibold shadow transition text-center hover:bg-accent-purple hover:border-accent-purple hover:text-white focus:outline-none focus:ring-2 focus:ring-accent-purple"
                            style={{ minWidth: 'max-content' }}
                          >
                            Šifre svih boja
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Material Options */}
                  <div>
                    <h3 className="mb-3 text-sm font-medium">Materijal</h3>
                    <RadioGroup value={selectedMaterial} onValueChange={handleMaterialChange}>
                      <div className="flex flex-wrap gap-2">
                        {availableMaterials.map((material) => (
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

                  {/* Request Custom Quote Button */}
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="mt-2" disabled={!isFormValid}>Zatraži prilagođenu ponudu</Button>
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
                              </div>
                            </div>
                          </div>

                          <DialogFooter>
                            <Button type="submit" disabled={!isFormValid}>Pošalji zahtjev</Button>
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
                </>
              ) : isUgaonaOrTdf ? (
                // CATEGORY: UGAONE GARNITURE & TDF
                <>
                  {/* Color Input */}
                  <div>
                    <h3 className="mb-3 text-sm font-medium">Unesite šifru željene boje</h3>
                    <div className="space-y-2">
                      <div className="flex flex-col sm:flex-row gap-2">
                        <div className="flex-1 flex flex-col justify-end">
                          <Input
                            id="color"
                            name="color"
                            placeholder="npr. Atakama 100, Berry 199, itd."
                            value={selectedColor}
                            onChange={(e) => setSelectedColor(e.target.value)}
                            className="w-full h-11 rounded-lg px-3 py-2 border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent-purple"
                          />
                        </div>
                        <div className="flex items-end sm:w-1/2">
                          <a
                            href="https://lion-fabrics.com/collections/all"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto h-11 flex items-center justify-center px-4 rounded-lg bg-primary border border-primary text-white font-semibold shadow transition text-center hover:bg-accent-purple hover:border-accent-purple hover:text-white focus:outline-none focus:ring-2 focus:ring-accent-purple"
                            style={{ minWidth: 'max-content' }}
                          >
                            Šifre svih boja
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Material Options */}
                  <div>
                    <h3 className="mb-3 text-sm font-medium">Materijal</h3>
                    <RadioGroup value={selectedMaterial} onValueChange={handleMaterialChange}>
                      <div className="flex flex-wrap gap-2">
                        {availableMaterials.map((material) => (
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

                  {/* Punjenje */}
                  <div>
                    <h3 className="mb-3 text-sm font-medium">Punjenje</h3>
                    <RadioGroup value={punjenje} onValueChange={setPunjenje} className="flex flex-col gap-2">
                      <div>
                        <RadioGroupItem value="val opruge/gurtne + HR spužva" id="punjenje1" />
                        <Label htmlFor="punjenje1" className="ml-2">val opruge/gurtne + HR spužva</Label>
                      </div>
                      <div>
                        <RadioGroupItem value="tvrdo sjedalo" id="punjenje2" />
                        <Label htmlFor="punjenje2" className="ml-2">tvrdo sjedalo</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Dimenzije */}
                  <div>
                    <h3 className="mb-3 text-sm font-medium">Prilagođene dimenzije</h3>
                    <div className="mb-3 flex justify-center">
                      <img
                        src="https://via.placeholder.com/192x192?text=Skica"
                        alt="Skica dimenzija proizvoda"
                        className="w-48 h-48 object-contain rounded border bg-stone-100"
                      />
                    </div>
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
                          placeholder="e.g., 220"
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
                          placeholder="e.g., 95"
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
                          placeholder="e.g., 85"
                          value={dimensions.height}
                          onChange={handleDimensionChange}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Opcije */}
                  <div>
                    <h3 className="mb-3 text-sm font-medium">Opcije</h3>
                    <RadioGroup value={opcije[0] || ""} onValueChange={v => setOpcije([v])} className="flex flex-col gap-2">
                      <div>
                        <RadioGroupItem value="sanduk/ladica" id="opcija1" />
                        <Label htmlFor="opcija1" className="ml-2">Sanduk/Ladica</Label>
                      </div>
                      <div>
                        <RadioGroupItem value="razvlačenje" id="opcija2" />
                        <Label htmlFor="opcija2" className="ml-2">Razvlačenje</Label>
                      </div>
                      <div>
                        <RadioGroupItem value="oboje" id="opcija3" />
                        <Label htmlFor="opcija3" className="ml-2">Oboje</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Request Custom Quote Button */}
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="mt-2" disabled={!isFormValid}>Zatraži prilagođenu ponudu</Button>
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
                                {punjenje && (
                                  <div>
                                    <span className="text-muted-foreground">Punjenje:</span> {punjenje}
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
                                {opcije.length > 0 && (
                                  <div className="mt-2 border-t pt-2">
                                    <div className="font-medium">Opcije:</div>
                                    <div className="flex flex-wrap gap-2">
                                      {opcije.map((opcija) => (
                                        <span key={opcija} className="inline-block rounded bg-stone-200 px-2 py-1 text-xs">
                                          {opcija}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          <DialogFooter>
                            <Button type="submit" disabled={!isFormValid}>Pošalji zahtjev</Button>
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
                </>
              ) : isKrevet ? (
                // CATEGORY: KREVETI
                <>
                  {/* Color Input */}
                  <div>
                    <h3 className="mb-3 text-sm font-medium">Unesite šifru željene boje</h3>
                    <div className="space-y-2">
                      <div className="flex flex-col sm:flex-row gap-2">
                        <div className="flex-1 flex flex-col justify-end">
                          <Input
                            id="color"
                            name="color"
                            placeholder="npr. Atakama 100, Berry 199, itd."
                            value={selectedColor}
                            onChange={(e) => setSelectedColor(e.target.value)}
                            className="w-full h-11 rounded-lg px-3 py-2 border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent-purple"
                          />
                        </div>
                        <div className="flex items-end sm:w-1/2">
                          <a
                            href="https://lion-fabrics.com/collections/all"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto h-11 flex items-center justify-center px-4 rounded-lg bg-primary border border-primary text-white font-semibold shadow transition text-center hover:bg-accent-purple hover:border-accent-purple hover:text-white focus:outline-none focus:ring-2 focus:ring-accent-purple"
                            style={{ minWidth: 'max-content' }}
                          >
                            Šifre svih boja
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Material Options */}
                  <div>
                    <h3 className="mb-3 text-sm font-medium">Materijal</h3>
                    <RadioGroup value={selectedMaterial} onValueChange={handleMaterialChange}>
                      <div className="flex flex-wrap gap-2">
                        {availableMaterials.map((material) => (
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

                  {/* Opcija Madraca */}
                  <div>
                    <h3 className="mb-3 text-sm font-medium">Opcija Madraca</h3>
                    <RadioGroup value={madracOpcija} onValueChange={setMadracOpcija} className="flex flex-col gap-2">
                      <div>
                        <RadioGroupItem value="ugradbeni madrac (francuski ležaj)" id="madrac1" />
                        <Label htmlFor="madrac1" className="ml-2">ugradbeni madrac (francuski ležaj)</Label>
                      </div>
                      <div>
                        <RadioGroupItem value="latoflex letvice (madrac se posebno kupuje)" id="madrac2" />
                        <Label htmlFor="madrac2" className="ml-2">latoflex letvice (madrac se posebno kupuje)</Label>
                      </div>
                      <div>
                        <RadioGroupItem value="podnica (madrac se posebno kupuje)" id="madrac3" />
                        <Label htmlFor="madrac3" className="ml-2">podnica (madrac se posebno kupuje)</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Dimenzije */}
                  <div>
                    <h3 className="mb-3 text-sm font-medium">Prilagođene dimenzije</h3>
                    <div className="mb-3 flex justify-center">
                      <img
                        src="https://via.placeholder.com/192x192?text=Skica"
                        alt="Skica dimenzija proizvoda"
                        className="w-48 h-48 object-contain rounded border bg-stone-100"
                      />
                    </div>
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
                          placeholder="e.g., 200"
                          value={dimensions.width}
                          onChange={handleDimensionChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="depth">Dužina (cm)</Label>
                        <Input
                          id="depth"
                          name="depth"
                          type="number"
                          placeholder="e.g., 220"
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
                          placeholder="e.g., 100"
                          value={dimensions.height}
                          onChange={handleDimensionChange}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Opcije */}
                  <div>
                    <h3 className="mb-3 text-sm font-medium">Opcije kreveta</h3>
                    <RadioGroup value={krevetOpcija} onValueChange={setKrevetOpcija} className="flex flex-col gap-2">
                      <div>
                        <RadioGroupItem value="sa sandukom" id="krevetopcija1" />
                        <Label htmlFor="krevetopcija1" className="ml-2">Sa sandukom</Label>
                      </div>
                      <div>
                        <RadioGroupItem value="bez sanduka" id="krevetopcija2" />
                        <Label htmlFor="krevetopcija2" className="ml-2">Bez sanduka</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Request Custom Quote Button */}
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="mt-2" disabled={!isFormValid}>Zatraži prilagođenu ponudu</Button>
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
                                {madracOpcija && (
                                  <div>
                                    <span className="text-muted-foreground">Opcija Madraca:</span> {madracOpcija}
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
                                        <span className="text-muted-foreground">Dužina:</span> {dimensions.depth || "—"} cm
                                      </div>
                                      <div>
                                        <span className="text-muted-foreground">Visina:</span> {dimensions.height || "—"} cm
                                      </div>
                                    </div>
                                  </div>
                                )}
                                {krevetOpcija && (
                                  <div className="mt-2 border-t pt-2">
                                    <div className="font-medium">Opcija:</div>
                                    <span className="inline-block rounded bg-stone-200 px-2 py-1 text-xs">
                                      {krevetOpcija}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          <DialogFooter>
                            <Button type="submit" disabled={!isFormValid}>Pošalji zahtjev</Button>
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
                </>
              ) : (
                // ORIGINAL FORM FOR OTHER CATEGORIES
                <>
                  {/* Color Input */}
                  <div>
                    <h3 className="mb-3 text-sm font-medium">Unesite šifru željene boje</h3>
                    <div className="space-y-2">
                      <div className="flex flex-col sm:flex-row gap-2">
                        <div className="flex-1 flex flex-col justify-end">
                          <Input
                            id="color"
                            name="color"
                            placeholder="npr. Atakama 100, Berry 199, itd."
                            value={selectedColor}
                            onChange={(e) => handleColorChange(e.target.value)}
                            className="w-full h-11 rounded-lg px-3 py-2 border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent-purple"
                          />
                        </div>
                        <div className="flex items-end sm:w-1/2">
                          <a
                            href="https://lion-fabrics.com/collections/all"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto h-11 flex items-center justify-center px-4 rounded-lg bg-primary border border-primary text-white font-semibold shadow transition text-center hover:bg-accent-purple hover:border-accent-purple hover:text-white focus:outline-none focus:ring-2 focus:ring-accent-purple"
                            style={{ minWidth: 'max-content' }}
                          >
                            Šifre svih boja
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Material Options */}
                  <div>
                    <h3 className="mb-3 text-sm font-medium">Materijal</h3>
                    <RadioGroup value={selectedMaterial} onValueChange={handleMaterialChange}>
                      <div className="flex flex-wrap gap-2">
                        {availableMaterials.map((material) => (
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

                  {/* Custom Dimensions */}
                  <div>
                    <h3 className="mb-3 text-sm font-medium">Prilagođene dimenzije</h3>
                    <div className="mb-3 flex justify-center">
                      <img
                        src="https://via.placeholder.com/192x192?text=Skica"
                        alt="Skica dimenzija proizvoda"
                        className="w-48 h-48 object-contain rounded border bg-stone-100"
                      />
                    </div>
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
                      <Button className="mt-2" disabled={!isFormValid}>Zatraži prilagođenu ponudu</Button>
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
                            <Button type="submit" disabled={!isFormValid}>Pošalji zahtjev</Button>
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
                </>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
