import { Suspense } from "react"
import { notFound } from "next/navigation"
import { getProduct, getProducts } from "@/actions/get-products"
import Container from "@/components/ui/container"
import Gallery from "@/components/gallery"
import Info from "@/components/info"
import ProductList from "@/components/product-list"
import { Toaster } from "@/components/ui/sonner"

interface PageProps {
  params: {
    id: string
  }
}

export default async function ProductPage({ params }: PageProps) {
  const product = await getProduct(params.id)

  if (!product) {
    return notFound()
  }

  const suggestedProducts = await getProducts({
    categoryId: product.kategorije[0]
  })

  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 sm:px-6 lg:px-8 pb-24">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            <Suspense fallback={<div>Loading gallery...</div>}>
              <Gallery images={product.slike} />
            </Suspense>
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <Suspense fallback={<div>Loading info...</div>}>
                <Info data={product} />
              </Suspense>
            </div>
          </div>
          <hr className="my-10" />
          <Suspense fallback={<div>Loading related products...</div>}>
            <ProductList title="Related Items" items={suggestedProducts} />
          </Suspense>
        </div>
      </Container>
      <Toaster />
    </div>
  )
}
