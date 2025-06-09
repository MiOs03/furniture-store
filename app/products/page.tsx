"use client"

import { useState, useMemo, Suspense } from "react"
import { Filter, ChevronDown, X, Check, ArrowUpDown } from "lucide-react"
import { useSearchParams, useRouter } from "next/navigation"

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
import { useAllProducts } from "@/lib/products"
import { useCategory } from "@/lib/contexts/category-context"
import { Product } from "@/lib/types"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select'

// Helper to normalize category strings for comparison
const normalize = (str: string) => str?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-");

// Category mapping
const categoryMap: Record<string, string> = {
  "all": "Svi proizvode",
  "ugaona-garnitura": "Garniture",
  "krevet": "Kreveti",
  "stolica": "Stolice",
  "stol": "Stolovi",
  "pločasti-namještaj": "Pločasti namještaj",
  "tdf": "TDF",
  "living-room": "Dining",
  "dining": "Dining",
  "bedroom": "Kreveti",
  "office": "Kancelarijski namještaj",
  "outdoor": "Outdoor",
  "sale": "Akcija"
}

// Create a new component for pagination
function Pagination({ totalPages, currentPage, onPageChange }: { 
  totalPages: number, 
  currentPage: number, 
  onPageChange: (page: number) => void 
}) {
  const searchParams = useSearchParams()
  const router = useRouter()

  return (
    <div className="flex justify-center gap-2 mt-8">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Button
          key={page}
          variant={page === currentPage ? "default" : "outline"}
          onClick={() => onPageChange(page)}
        >
          {page}
        </Button>
      ))}
    </div>
  )
}

export default function ProductsPage() {
  const { activeCategory, setActiveCategory } = useCategory()
  const { products, loading, error } = useAllProducts()
  const [priceRange, setPriceRange] = useState<number[]>([0, 5000])
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [sortOption, setSortOption] = useState<string>("featured")
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    message: ""
  })
  const [formError, setFormError] = useState("")
  const [formSuccess, setFormSuccess] = useState(false)

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    if (!products) return []
    let result = [...products]
    // Filter by category
    if (activeCategory === "sale") {
      result = result.filter((product) => product.staraCijena !== undefined && product.staraCijena > product.cijena)
    } else if (activeCategory !== "all") {
      result = result.filter((product) =>
        Array.isArray(product.kategorije) &&
        product.kategorije.some(
          (cat: string) => normalize(cat) === normalize(categoryMap[activeCategory] || activeCategory)
        )
      )
    }
    // Filter by price range
    result = result.filter((product) => product.cijena >= priceRange[0] && product.cijena <= priceRange[1])
    // Filter by materials
    if (selectedMaterials.length > 0) {
      result = result.filter((product) => product.materijali?.some((material: string) => selectedMaterials.includes(material)))
    }
    // Filter by colors
    if (selectedColors.length > 0) {
      result = result.filter((product) => product.boje?.some((color: { naziv: string }) => selectedColors.includes(color.naziv)))
    }
    // Sorting
    switch (sortOption) {
      case "newest":
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      case "featured":
        result.sort((a, b) => (b.popularityScore || 0) - (a.popularityScore || 0))
        break
      case "price-low-high":
        result.sort((a, b) => a.cijena - b.cijena)
        break
      case "price-high-low":
        result.sort((a, b) => b.cijena - a.cijena)
        break
      case "name-a-z":
        result.sort((a, b) => a.naziv.localeCompare(b.naziv))
        break
      case "name-z-a":
        result.sort((a, b) => b.naziv.localeCompare(a.naziv))
        break
      default:
        break
    }
    return result
  }, [products, activeCategory, priceRange, selectedMaterials, selectedColors, sortOption])

  // Pagination logic
  const PRODUCTS_PER_PAGE = 12
  const [currentPage, setCurrentPage] = useState(1)
  const totalProducts = filteredProducts.length
  const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE)
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * PRODUCTS_PER_PAGE
    const end = start + PRODUCTS_PER_PAGE
    return filteredProducts.slice(start, end)
  }, [filteredProducts, currentPage])

  const goToPage = (page: number) => {
    setCurrentPage(page)
  }

  // Extract all unique materials and colors from products
  const allMaterials = Array.from(
    new Set(products?.flatMap((product) => product.materijali || []).filter(Boolean) || [])
  )

  const allColors = Array.from(
    new Set(products?.flatMap((product) => product.boje?.map((color: { naziv: string }) => color.naziv) || [])
      .filter(Boolean) || [])
  )

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

  function handleFormChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault()
    setFormError("")
    setFormSuccess(false)
    if (!form.phone.trim()) {
      setFormError("Telefon je obavezan.")
      return
    }
    // Send to API
    fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        phone: form.phone,
        address: form.address,
        message: form.message,
        subject: "Pločasti namještaj - zahtjev za narudžbu"
      })
    })
      .then(res => {
        if (!res.ok) throw new Error("Greška prilikom slanja zahtjeva.")
        setFormSuccess(true)
        setForm({ name: "", email: "", phone: "", address: "", message: "" })
      })
      .catch(() => {
        setFormError("Došlo je do greške. Molimo pokušajte ponovo.")
      })
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
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                {/* Order Form */}
                <form onSubmit={handleFormSubmit} className="bg-white rounded-lg p-6 mt-6 shadow">
                  <h3 className="text-lg font-semibold mb-4">Zahtjev za narudžbu</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block mb-1 text-sm font-medium">Ime i prezime</label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleFormChange}
                        className="w-full border rounded px-3 py-2"
                        autoComplete="name"
                      />
                    </div>
                    <div>
                      <label className="block mb-1 text-sm font-medium">Email (opcionalno)</label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleFormChange}
                        className="w-full border rounded px-3 py-2"
                        autoComplete="email"
                      />
                    </div>
                    <div>
                      <label className="block mb-1 text-sm font-medium">Telefon <span className="text-red-500">*</span></label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleFormChange}
                        className="w-full border rounded px-3 py-2"
                        autoComplete="tel"
                        required
                      />
                    </div>
                    <div>
                      <label className="block mb-1 text-sm font-medium">Adresa za dostavu (opcionalno)</label>
                      <input
                        type="text"
                        name="address"
                        value={form.address}
                        onChange={handleFormChange}
                        className="w-full border rounded px-3 py-2"
                        autoComplete="address"
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block mb-1 text-sm font-medium">Poruka (opcionalno)</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleFormChange}
                      className="w-full border rounded px-3 py-2 min-h-[80px]"
                    />
                  </div>
                  {formError && <div className="mb-2 text-red-600 text-sm">{formError}</div>}
                  {formSuccess && <div className="mb-2 text-green-600 text-sm">Vaš zahtjev je uspješno poslan!</div>}
                  <button
                    type="submit"
                    className="w-full bg-accent-purple text-white font-semibold py-3 rounded mt-2 hover:bg-accent-purple/90 transition"
                  >
                    Pošalji zahtjev
                  </button>
                </form>
              </div>
            )}

            {/* Products Grid - mobile: direct render, desktop: Tabs/TabsContent */}
            <div className="block sm:hidden">
              {loading ? (
                <div className="py-24 text-center text-lg">Učitavanje...</div>
              ) : error ? (
                <div className="py-24 text-center text-lg text-red-500">{error}</div>
              ) : paginatedProducts.length > 0 ? (
                <>
                  <div className="grid gap-6 pb-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {paginatedProducts.map((product, index) => {
                      let slika = product.slika;
                      if ((!slika || typeof slika !== 'string') && Array.isArray(product.slike)) {
                        const found = product.slike.find((img: string) => img && img.trim() !== "");
                        slika = found ? found : "/placeholder.svg";
                      }
                      if (slika && !slika.startsWith('/')) {
                        slika = `/images/products/${slika}`;
                      }
                      if (!slika) {
                        slika = "/placeholder.svg";
                      }
                      return <ProductCard key={`${product.id}-${product.kategorije?.[0] || 'uncategorized'}-${index}`} product={{ ...product, slika, id: String(product.id) }} />;
                    })}
                  </div>
                  <Suspense fallback={<div>Loading pagination...</div>}>
                    <Pagination 
                      totalPages={totalPages} 
                      currentPage={currentPage} 
                      onPageChange={goToPage} 
                    />
                  </Suspense>
                </>
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
                  {loading ? (
                    <div className="col-span-full py-24 text-center">Učitavanje...</div>
                  ) : error ? (
                    <div className="col-span-full py-24 text-center text-red-500">{error}</div>
                  ) : paginatedProducts.length > 0 ? (
                    <>
                      {paginatedProducts.map((product, index) => {
                        let slika = product.slika;
                        if ((!slika || typeof slika !== 'string') && Array.isArray(product.slike)) {
                          const found = product.slike.find((img: string) => img && img.trim() !== "");
                          slika = found ? found : "/placeholder.svg";
                        }
                        if (slika && !slika.startsWith('/')) {
                          slika = `/images/products/${slika}`;
                        }
                        if (!slika) {
                          slika = "/placeholder.svg";
                        }
                        return <ProductCard key={`${product.id}-${product.kategorije?.[0] || 'uncategorized'}-${index}`} product={{ ...product, slika, id: String(product.id) }} />;
                      })}
                      <Suspense fallback={<div>Loading pagination...</div>}>
                        <Pagination 
                          totalPages={totalPages} 
                          currentPage={currentPage} 
                          onPageChange={goToPage} 
                        />
                      </Suspense>
                    </>
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
