"use client"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Check, Star, ShoppingBag } from "lucide-react"
import { useEffect, useState, use } from "react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import Footer from "@/components/layout/footer"
import ProductCard from "@/components/sections/product-card"
import CustomDimensionsForm from "@/components/sections/custom-dimensions-form"
import AddToCartWithOptions from "@/components/cart/add-to-cart-with-options"
import { fetchAllProducts } from "@/lib/products"
import { Toaster } from "@/components/ui/toaster"
import { Product, CustomizationType } from "@/lib/types"
import Navbar from "@/components/layout/navbar"

interface ProductPageProps {
  params: Promise<{ id: string }>
}

export default function ProductPage({ params }: ProductPageProps) {
  const { id } = use(params)
  const [product, setProduct] = useState<any | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // Image gallery state: selected image, default to first in slike array
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined)

  useEffect(() => {
    async function load() {
      const allProducts = await fetchAllProducts()
      const found = allProducts.find((p: any) => String(p.id) === id || p.slug === id)
      setProduct(found || null)
      if (found) {
        setRelatedProducts(
          allProducts.filter((p: any) => p.kategorije?.[0] === found.kategorije?.[0] && (String(p.id) !== id && p.slug !== id)).slice(0, 4)
        )
        // Set initial selected image to first in slike array or slika
        setSelectedImage(found.slike?.[0] || found.slika)
      }
      setLoading(false)
    }
    load()
  }, [id])

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="container flex-1 px-4 py-12 md:px-6">
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <h1 className="mb-4 text-2xl font-medium">Učitavanje proizvoda...</h1>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="container flex-1 px-4 py-12 md:px-6">
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <h1 className="mb-4 text-2xl font-medium">Proizvod Nije Pronađen</h1>
            <p className="mb-8 text-muted-foreground">
              Proizvod koji tražite ne postoji ili je uklonjen.
            </p>
            <Button asChild>
              <Link href="/products">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Nazad na Proizvode
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  // Helper for image src
  function getImageSrc(img: string | undefined) {
    if (!img) return "/placeholder.svg"
    if (img.startsWith("/")) return img
    return `/images/products/${img}`
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="container px-4 py-4 md:px-6">
          <div className="flex items-center text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Početna
            </Link>
            <span className="mx-2">/</span>
            <Link href="/products" className="hover:text-foreground">
              Proizvodi
            </Link>
            <span className="mx-2">/</span>
            <Link href={`/products?category=${product.kategorije?.[0]}`} className="hover:text-foreground">
              {product.kategorije?.[0]}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{product.naziv}</span>
          </div>
        </div>

        {/* Product Details */}
        <section className="container px-4 py-8 md:px-6 md:py-12 pb-8">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="overflow-hidden rounded-lg min-h-[220px] sm:min-h-[320px]">
                <Image
                  src={getImageSrc(selectedImage)}
                  alt={product?.naziv || "Proizvod"}
                  width={800}
                  height={800}
                  className="h-auto w-full object-cover"
                  priority
                />
              </div>
              <div className="grid grid-cols-4 gap-4 overflow-x-auto flex-nowrap sm:grid-cols-4 sm:overflow-x-visible" style={{ WebkitOverflowScrolling: 'touch' }}>
                {(product?.slike || []).map((slika: string, index: number) => (
                  <div
                    key={index}
                    className={`overflow-hidden rounded-lg min-w-[64px] cursor-pointer border ${selectedImage === slika ? 'border-black' : 'border-transparent'}`}
                    onClick={() => setSelectedImage(slika)}
                  >
                    <Image
                      src={getImageSrc(slika)}
                      alt={`${product?.naziv || "Proizvod"} - pogled ${index + 1}`}
                      width={200}
                      height={200}
                      className="h-auto w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-light">{product.naziv}</h1>
                <div className="mt-2 flex items-center">
                  <div className="flex items-center">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < (product?.ocjena || 0) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                  </div>
                  <span className="ml-2 text-sm text-muted-foreground">
                    {product?.ocjena?.toFixed(1) || "0.0"} ({product?.brojRecenzija || 0} recenzija)
                  </span>
                </div>
              </div>

              <div>
                <p className="text-2xl font-medium">{product.cijena.toLocaleString()} KM</p>
                {product.staraCijena && (
                  <p className="text-sm text-muted-foreground line-through">{product.staraCijena.toLocaleString()} KM</p>
                )}
              </div>

              <p className="text-muted-foreground">{product.opis}</p>

              {/* Boja as text and Lion Boje link */}
              {product.boje && product.boje.length > 0 && (
                <div>
                  <h3 className="mb-1 text-sm font-medium">Boja</h3>
                  <div className="mb-2 text-base">{product.boje.map((b: any) => b.naziv).join(", ")}</div>
                </div>
              )}

              {/* Materijal as text if available */}
              {product.materijali && product.materijali.length > 0 && (
                <div>
                  <h3 className="mb-1 text-sm font-medium">Materijal</h3>
                  <div className="mb-2 text-base">{product.materijali.map((m: any) => m).join(", ")}</div>
                </div>
              )}

              {/* Add to Cart */}
              <AddToCartWithOptions 
                productId={product.id}
                name={product.naziv}
                price={product.cijena}
                image={product.slika}
                colors={product.boje?.map(b => b.naziv) || []}
                materials={product.materijali || []}
                dimensions={product.dimenzije?.map(d => d.vrijednost) || []}
                buttonClassName="w-full h-16 rounded-xl bg-black text-white text-lg font-medium flex items-center justify-center shadow-md transition-all duration-200 hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-black"
                aria-label="Dodaj u korpu"
              />

              {/* kreiraj po sopstvenoj mjeri(CustomDimensionsForm as accordion) with full card background */}
              <div className="w-full mt-4 rounded-xl bg-white shadow-md p-0">
                <CustomDimensionsForm
                  productName={product?.naziv || ""}
                  product={product || { id: 0, naziv: "", cijena: 0, opis: "", kategorije: [], slika: "", slike: [], ocjena: 0, brojRecenzija: 0, dimenzije: [] }}
                  aria-label="Personalizuj bez kompromisa"
                />
              </div>

              {/* Delivery Info */}
              <div className="space-y-3 rounded-lg border p-4">
                <div className="flex items-start">
                  <Check className="mr-2 h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium">Na Stanju</p>
                    <p className="text-sm text-muted-foreground">Isporuka u roku od 1-2 radna dana</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Check className="mr-2 h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium">Besplatna Dostava</p>
                    <p className="text-sm text-muted-foreground">Za narudžbe preko 1000 KM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Details Tabs */}
        <section className="container px-4 py-8 md:px-6 md:py-12">
          <Tabs defaultValue="details">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="details">Detalji</TabsTrigger>
              <TabsTrigger value="dimensions">Dimenzije</TabsTrigger>
              <TabsTrigger value="care">Upute za Njegu</TabsTrigger>
              <TabsTrigger value="reviews">Recenzije</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="mt-6 space-y-4">
              <h3 className="text-lg font-medium">Detalji Proizvoda</h3>
              <p>{product.puniOpis}</p>
              <ul className="ml-6 list-disc space-y-2">
                {(product.karakteristike || []).map((feature: string, index: number) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="dimensions" className="mt-6 space-y-4">
              <h3 className="text-lg font-medium">Dimenzije</h3>
              {(() => {
                const width = product?.dimenzije?.find((d: any) => d.naziv.toLowerCase().includes('širina'))?.vrijednost || '—';
                const depth = product?.dimenzije?.find((d: any) => d.naziv.toLowerCase().includes('dubina'))?.vrijednost || '—';
                const height = product?.dimenzije?.find((d: any) => d.naziv.toLowerCase().includes('visina'))?.vrijednost || '—';
                return (
                  <div className="text-base font-medium mb-2">
                    {`Širina: ${width} x Dubina: ${depth} x Visina: ${height}`}
                  </div>
                );
              })()}
              <div className="mt-6 rounded-md bg-stone-50 p-4">
                <h4 className="mb-2 text-lg font-medium">Dostupne Prilagođene Dimenzije</h4>
                <p className="mb-4">
                  Ne vidite dimenzije koje vam trebaju? Specijalizirani smo za prilagođeni namještaj prema vašim specifikacijama.
                </p>
                <p className="mb-4">
                  Koristite sekciju "Prilagodite Vaš {product.naziv}" iznad za upit o prilagođenim dimenzijama{" "}
                  {product.naziv.toLowerCase()}.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="care" className="mt-6 space-y-4">
              <h3 className="text-lg font-medium">Upute za Njegu</h3>
              <p>{product.uputstvaZaNjegu}</p>
            </TabsContent>
            <TabsContent value="reviews" className="mt-6 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Recenzije Kupaca</h3>
                <Button>Napišite Recenziju</Button>
              </div>

              <div className="space-y-6">
                {(product.recenzije || []).map((review: any, index: number) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{review.autor}</p>
                        <div className="flex items-center">
                          {Array(5)
                            .fill(0)
                            .map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${
                                  i < review.ocjena ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                }`}
                              />
                            ))}
                          <span className="ml-2 text-xs text-muted-foreground">{review.datum}</span>
                        </div>
                      </div>
                    </div>
                    <p>{review.sadrzaj}</p>
                    <Separator className="mt-4" />
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* Related Products */}
        <section className="container px-4 py-8 md:px-6 md:py-12">
          <h2 className="mb-8 text-2xl font-light">Možda Vam Se Sviđa</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
      <Toaster />
    </div>
  )
}
