"use client"

import { Suspense, useEffect, useState } from "react"
import { notFound } from "next/navigation"
import { use } from "react"

import Footer from "@/components/layout/footer"
import Navbar from "@/components/layout/navbar"
import Container from "@/components/ui/container"
import Gallery from "@/components/gallery"
import Info from "@/components/info"
import { Toaster } from "@/components/ui/sonner"

interface ProductPageProps {
  params: {
    productId: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const { id } = use(params)

  const [product, setProduct] = useState<any | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/products/${params.productId}`
        )
        const data = await res.json()
        setProduct(data)
      } catch (error) {
        console.error("Error fetching product:", error)
        setProduct(null)
      } finally {
        setLoading(false)
      }
    }

    const fetchRelatedProducts = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/products?categoryId=${product?.category?.id}`
        )
        const data = await res.json()
        setRelatedProducts(data)
      } catch (error) {
        console.error("Error fetching related products:", error)
      }
    }

    fetchProduct()
    if (product?.category?.id) {
      fetchRelatedProducts()
    }
  }, [params.productId, product?.category?.id])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-2xl">
        Loading...
      </div>
    )
  }

  if (!product) {
    return notFound()
  }

  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center text-2xl">Učitavanje proizvoda...</div>}>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">
          <Container>
            <div className="px-4 py-10 sm:px-6 lg:px-8">
              <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
                <Gallery images={product.images} />
                <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                  <Info data={product} />
                </div>
              </div>
              <hr className="my-10" />
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-neutral-900">
                  Related Items
                </h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {relatedProducts.map((item) => (
                    <Info key={item.id} data={item} />
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </main>
        <Footer />
        <Toaster />
      </div>
    </Suspense>
  )
}
