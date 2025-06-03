"use client"

import { useState, useEffect } from "react"
import { Filter, ChevronDown, X, Check, ArrowUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import ProductCard from "@/components/sections/product-card"
import { getAllProducts } from "@/lib/products"
import { useCategory } from "@/lib/contexts/category-context"
import { Product } from "@/lib/types"
import PlocastiOrderRequestForm from '@/components/sections/plocasti-order-request-form'
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select'

export default function ProductsPage() {
  const { activeCategory, setActiveCategory } = useCategory()
  const allProducts: Product[] = getAllProducts()
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(allProducts)
  const [priceRange, setPriceRange] = useState<number[]>([0, 5000])
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [sortOption, setSortOption] = useState<string>("featured")

  // Extract all unique materials and colors from products
  const allMaterials = Array.from(new Set(allProducts.flatMap((product) => product.materials || []).filter(Boolean)))

  const allColors = Array.from(
    new Set(allProducts.flatMap((product) => product.colors?.map((color) => color.name) || []).filter(Boolean)),
  )

  // Category mapping
  const categoryMap: Record<string, string> = {
    "all": "Svi proizvode",
    "ugaona-garnitura": "Ugaone garniture",
    "krevet": "Kreveti",
    "stolica": "Stolice",
    "stol": "Stolovi",
    "pločasti-namještaj": "Pločasti namještaj",
    "living-room": "Dining",
    "dining": "Dining",
    "bedroom": "Kreveti",
    "office": "Kancelarijski namještaj",
    "outdoor": "Outdoor",
    "sale": "Akcija"
  }

  // Category options for select
  const categoryOptions = [
    { value: "all", label: "Sve" },
    { value: "ugaona-garnitura", label: "Ugaone garniture" },
    { value: "tdf", label: "TDF" },
    { value: "krevet", label: "Kreveti" },
    { value: "stolica", label: "Stolice" },
    { value: "stol", label: "Stolovi" },
    { value: "pločasti-namještaj", label: "Pločasti namještaj" },
    { value: "sale", label: "Akcija" },
  ]

  // Apply filters and sorting
  useEffect(() => {
    let result = [...allProducts]

    // Filter by category
    if (activeCategory === "sale") {
      result = result.filter((product) => product.oldPrice !== undefined && product.oldPrice > product.price)
    } else if (activeCategory !== "all") {
      result = result.filter((product) => product.category === activeCategory)
    }

    // Filter by price range
    result = result.filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1])

    // Filter by materials
    if (selectedMaterials.length > 0) {
      result = result.filter((product) => product.materials?.some((material) => selectedMaterials.includes(material)))
    }

    // Filter by colors
    if (selectedColors.length > 0) {
      result = result.filter((product) => product.colors?.some((color) => selectedColors.includes(color.name)))
    }

    // Apply sorting
    switch (sortOption) {
      case "newest":
        result.sort((a, b) => (b.id || 0) - (a.id || 0)) // Assuming newer products have higher IDs
        break
      case "price-low-high":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-high-low":
        result.sort((a, b) => b.price - a.price)
        break
      case "name-a-z":
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "name-z-a":
        result.sort((a, b) => b.name.localeCompare(a.name))
        break
      default:
        // Featured - no sorting needed
        break
    }

    setFilteredProducts(result)
  }, [activeCategory, priceRange, selectedMaterials, selectedColors, sortOption, allProducts])

  // Toggle material selection
  const toggleMaterial = (material: string) => {
    setSelectedMaterials((prev) => (prev.includes(material) ? prev.filter((m) => m !== material) : [...prev, material]))
  }

  // Toggle color selection
  const toggleColor = (color: string) => {
    setSelectedColors((prev) => (prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]))
  }

  // Reset all filters
  const resetFilters = () => {
    setPriceRange([0, 5000])
    setSelectedMaterials([])
    setSelectedColors([])
    setSortOption("featured")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section id="collection-section" className="py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <div>
                <h1 className="text-3xl font-light tracking-tight sm:text-4xl">Naša kolekcija</h1>
                <p className="text-muted-foreground">Pogledajte našu kolekciju proizvoda</p>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4 mb-6">
                {/* Kategorije as select on mobile, tabs on desktop */}
                <div className="w-full sm:w-auto">
                  <div className="block sm:hidden">
                    <Select value={activeCategory} onValueChange={setActiveCategory} aria-label="Kategorije">
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Kategorije" />
                      </SelectTrigger>
                      <SelectContent>
                        {categoryOptions.map(opt => (
                          <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="hidden sm:block">
                    <Tabs defaultValue={activeCategory} value={activeCategory} onValueChange={setActiveCategory} className="" aria-label="Kategorije">
                      <TabsList className="inline-flex w-auto">
                        {categoryOptions.map(opt => (
                          <TabsTrigger key={opt.value} value={opt.value}>{opt.label}</TabsTrigger>
                        ))}
                      </TabsList>
                    </Tabs>
                  </div>
                </div>
                {/* Sortiraj Dropdown */}
                <div className="w-full sm:w-auto">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-full justify-between sm:w-auto" aria-label="Sortiraj proizvode">
                        <ArrowUpDown className="mr-2 h-4 w-4" />
                        Sortiraj
                        <ChevronDown className="ml-2 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuLabel>Sortiraj po</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem onClick={() => setSortOption("newest")}>Najnoviji{sortOption === "newest" && <Check className="ml-auto h-4 w-4" />}</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setSortOption("featured")}>Najpopularniji{sortOption === "featured" && <Check className="ml-auto h-4 w-4" />}</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setSortOption("price-low-high")}>Cena: Niska do visoka{sortOption === "price-low-high" && <Check className="ml-auto h-4 w-4" />}</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setSortOption("price-high-low")}>Cena: Visoka do niska{sortOption === "price-high-low" && <Check className="ml-auto h-4 w-4" />}</DropdownMenuItem>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      {/* Price Range inside sort dropdown */}
                      <div className="px-4 py-2">
                        <span className="block text-xs font-medium mb-1">Cijena (KM)</span>
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            min="0"
                            className="w-16 rounded border px-2 py-1 text-xs"
                            value={priceRange[0]}
                            onChange={e => setPriceRange([Number(e.target.value), priceRange[1]])}
                          />
                          <span className="text-xs">-</span>
                          <input
                            type="number"
                            min="0"
                            className="w-16 rounded border px-2 py-1 text-xs"
                            value={priceRange[1]}
                            onChange={e => setPriceRange([priceRange[0], Number(e.target.value)])}
                          />
                        </div>
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>

            {/* Active Filters Display */}
            {(selectedMaterials.length > 0 ||
              selectedColors.length > 0 ||
              priceRange[0] > 0 ||
              priceRange[1] < 5000) && (
              <div className="mb-6 flex flex-wrap gap-2">
                <span className="text-sm font-medium">Aktivni filtri:</span>
                {priceRange[0] > 0 || priceRange[1] < 5000 ? (
                  <div className="flex items-center rounded-full bg-stone-100 px-3 py-1 text-xs">
                    KM {priceRange[0]} - KM {priceRange[1]}
                    <button
                      onClick={() => setPriceRange([0, 5000])}
                      className="ml-1 rounded-full p-1 hover:bg-stone-200"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ) : null}
                {selectedMaterials.map((material) => (
                  <div key={material} className="flex items-center rounded-full bg-stone-100 px-3 py-1 text-xs">
                    {material}
                    <button
                      onClick={() => toggleMaterial(material)}
                      className="ml-1 rounded-full p-1 hover:bg-stone-200"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
                {selectedColors.map((color) => (
                  <div key={color} className="flex items-center rounded-full bg-stone-100 px-3 py-1 text-xs">
                    {color}
                    <button onClick={() => toggleColor(color)} className="ml-1 rounded-full p-1 hover:bg-stone-200">
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={resetFilters}
                  className="text-xs text-muted-foreground underline hover:text-foreground px-2 py-1 rounded"
                  aria-label="Očisti sve filtre"
                >
                  Očisti sve
                </button>
              </div>
            )}

            {/* Special section for 'Pločasti namještaj' */}
            {activeCategory === "pločasti-namještaj" && (
              <div className="my-8 rounded-md border bg-stone-50 p-6">
                <h2 className="mb-2 text-xl font-bold">Pločasti namještaj</h2>
                <div className="mb-4">
                  <a
                    href="https://dsmtrade.ba/wp-content/uploads/2025/04/DSM-Katalog-April-2025.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-accent-purple text-white font-semibold shadow hover:bg-accent-purple/90 transition"
                  ><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 3h10a2 2 0 012 2v14a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2zm0 0v4h10V3M9 12h6m-6 4h6" />
                </svg>
                
                    
                    Pogledajte katalog (PDF)
                  </a>
                </div>
                <div className="mb-4 space-y-1 text-base">
                  <div>Prodaja gotovih proizvoda / Kataloška narudžba</div>
                  <div>Brza isporuka</div>
                  <div>Za informaciju o cijeni pošaljite nam šifru proizvoda ili naziv proizvoda.</div>
                </div>
                <PlocastiOrderRequestForm />
              </div>
            )}

            {/* Products Grid - mobile: direct render, desktop: Tabs/TabsContent */}
            <div className="block sm:hidden">
              {filteredProducts.length > 0 ? (
                <div className="grid gap-6 pb-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)}
                </div>
              ) : (
                activeCategory !== "pločasti-namještaj" && (
                  <div className="col-span-full py-12 text-center">
                    <p className="mb-4 text-lg font-medium">Nema proizvoda koji odgovaraju vašim filtrom</p>
                    <p className="mb-6 text-muted-foreground">
                      Podesite filtre ili pregledajte naše kategorije za više opcija.
                    </p>
                    <Button onClick={resetFilters}>Resetuj filtre</Button>
                  </div>
                )
              )}
            </div>
            <div className="hidden sm:block">
              <Tabs defaultValue={activeCategory} value={activeCategory} onValueChange={setActiveCategory}>
                <TabsContent value={activeCategory} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)
                  ) : (
                    activeCategory !== "pločasti-namještaj" && (
                      <div className="col-span-full py-12 text-center">
                        <p className="mb-4 text-lg font-medium">Nema proizvoda koji odgovaraju vašim filtrom</p>
                        <p className="mb-6 text-muted-foreground">
                          Podesite filtre ili pregledajte naše kategorije za više opcija.
                        </p>
                        <Button onClick={resetFilters}>Resetuj filtre</Button>
                      </div>
                    )
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
