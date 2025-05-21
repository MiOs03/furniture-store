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

export default function ProductsPage() {
  const { activeCategory, setActiveCategory } = useCategory()
  const allProducts = getAllProducts()
  const [filteredProducts, setFilteredProducts] = useState(allProducts)
  const [priceRange, setPriceRange] = useState([0, 5000])
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [sortOption, setSortOption] = useState("featured")

  // Extract all unique materials and colors from products
  const allMaterials = Array.from(new Set(allProducts.flatMap((product) => product.materials || []).filter(Boolean)))

  const allColors = Array.from(
    new Set(allProducts.flatMap((product) => product.colors?.map((color) => color.name) || []).filter(Boolean)),
  )

  // Category mapping
  const categoryMap = {
    all: "All Products",
    sofa: "Sofas",
    bed: "Beds",
    chair: "Chairs",
    table: "Tables",
    panel: "Panel Furniture",
    "living-room": "Living Room",
    dining: "Dining",
    bedroom: "Bedroom",
    office: "Office",
    outdoor: "Outdoor",
  }

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
                <h1 className="text-3xl font-light tracking-tight sm:text-4xl">Our Collection</h1>
                <p className="text-muted-foreground">Discover furniture that combines beauty and functionality</p>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                {/* Sort Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full justify-between sm:w-auto">
                      <ArrowUpDown className="mr-2 h-4 w-4" />
                      Sort
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>Sort By</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem onClick={() => setSortOption("newest")}>
                        Newest
                        {sortOption === "newest" && <Check className="ml-auto h-4 w-4" />}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSortOption("featured")}>
                        Featured
                        {sortOption === "featured" && <Check className="ml-auto h-4 w-4" />}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSortOption("price-low-high")}>
                        Price: Low to High
                        {sortOption === "price-low-high" && <Check className="ml-auto h-4 w-4" />}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSortOption("price-high-low")}>
                        Price: High to Low
                        {sortOption === "price-high-low" && <Check className="ml-auto h-4 w-4" />}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSortOption("name-a-z")}>
                        Name: A to Z{sortOption === "name-a-z" && <Check className="ml-auto h-4 w-4" />}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSortOption("name-z-a")}>
                        Name: Z to A{sortOption === "name-z-a" && <Check className="ml-auto h-4 w-4" />}
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Filter Sheet */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="w-full sm:w-auto">
                      <Filter className="mr-2 h-4 w-4" />
                      Filter
                    </Button>
                  </SheetTrigger>
                  <SheetContent className="overflow-y-auto sm:max-w-md">
                    <SheetHeader>
                      <SheetTitle>Filter Products</SheetTitle>
                      <SheetDescription>Refine your search with the following filters.</SheetDescription>
                    </SheetHeader>
                    <div className="mt-6 space-y-6">
                      {/* Price Range Filter */}
                      <div className="space-y-4">
                        <h3 className="font-medium">Price Range</h3>
                        <div className="space-y-2">
                          <Slider
                            defaultValue={[0, 5000]}
                            max={5000}
                            step={100}
                            value={priceRange}
                            onValueChange={setPriceRange}
                          />
                          <div className="flex items-center justify-between">
                            <span>${priceRange[0]}</span>
                            <span>${priceRange[1]}</span>
                          </div>
                        </div>
                      </div>

                      {/* Materials Filter */}
                      <div className="space-y-4">
                        <h3 className="font-medium">Materials</h3>
                        <div className="grid grid-cols-2 gap-2">
                          {allMaterials.map((material) => (
                            <div key={material} className="flex items-center space-x-2">
                              <Checkbox
                                id={`material-${material}`}
                                checked={selectedMaterials.includes(material)}
                                onCheckedChange={() => toggleMaterial(material)}
                              />
                              <Label htmlFor={`material-${material}`}>{material}</Label>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Colors Filter */}
                      <div className="space-y-4">
                        <h3 className="font-medium">Colors</h3>
                        <div className="grid grid-cols-2 gap-2">
                          {allColors.map((color) => (
                            <div key={color} className="flex items-center space-x-2">
                              <Checkbox
                                id={`color-${color}`}
                                checked={selectedColors.includes(color)}
                                onCheckedChange={() => toggleColor(color)}
                              />
                              <Label htmlFor={`color-${color}`}>{color}</Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <SheetFooter className="mt-6 flex-row justify-between">
                      <Button variant="outline" onClick={resetFilters}>
                        Reset Filters
                      </Button>
                      <SheetClose asChild>
                        <Button>Apply Filters</Button>
                      </SheetClose>
                    </SheetFooter>
                  </SheetContent>
                </Sheet>
              </div>
            </div>

            {/* Category Tabs */}
            <Tabs defaultValue={activeCategory} value={activeCategory} onValueChange={setActiveCategory} className="mb-8">
              <div className="mb-6 overflow-x-auto">
                <TabsList className="inline-flex w-auto">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="sofa">Sofas</TabsTrigger>
                  <TabsTrigger value="bed">Beds</TabsTrigger>
                  <TabsTrigger value="chair">Chairs</TabsTrigger>
                  <TabsTrigger value="table">Tables</TabsTrigger>
                  <TabsTrigger value="panel">Panel Furniture</TabsTrigger>
                  <TabsTrigger value="sale" className="text-red-500 hover:text-red-600">Sale</TabsTrigger>
                </TabsList>
              </div>

              {/* Active Filters Display */}
              {(selectedMaterials.length > 0 ||
                selectedColors.length > 0 ||
                priceRange[0] > 0 ||
                priceRange[1] < 5000) && (
                <div className="mb-6 flex flex-wrap gap-2">
                  <span className="text-sm font-medium">Active Filters:</span>
                  {priceRange[0] > 0 || priceRange[1] < 5000 ? (
                    <div className="flex items-center rounded-full bg-stone-100 px-3 py-1 text-xs">
                      ${priceRange[0]} - ${priceRange[1]}
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
                    className="text-xs text-muted-foreground underline hover:text-foreground"
                  >
                    Clear All
                  </button>
                </div>
              )}

              {/* Products Grid */}
              <TabsContent value={activeCategory} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)
                ) : (
                  <div className="col-span-full py-12 text-center">
                    <p className="mb-4 text-lg font-medium">No products match your filters</p>
                    <p className="mb-6 text-muted-foreground">
                      Try adjusting your filters or browse our categories for more options.
                    </p>
                    <Button onClick={resetFilters}>Reset Filters</Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
