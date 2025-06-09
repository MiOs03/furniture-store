import { Product } from "@/types"

export async function getProduct(id: string): Promise<Product | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`)
    if (!res.ok) {
      return null
    }
    return res.json()
  } catch (error) {
    console.error("Error fetching product:", error)
    return null
  }
}

interface GetProductsParams {
  categoryId?: string
  colorId?: string
  sizeId?: string
  isFeatured?: boolean
}

export async function getProducts(params: GetProductsParams = {}): Promise<Product[]> {
  try {
    const queryParams = new URLSearchParams()
    if (params.categoryId) queryParams.append("categoryId", params.categoryId)
    if (params.colorId) queryParams.append("colorId", params.colorId)
    if (params.sizeId) queryParams.append("sizeId", params.sizeId)
    if (params.isFeatured) queryParams.append("isFeatured", "true")

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products?${queryParams.toString()}`
    )
    if (!res.ok) {
      return []
    }
    return res.json()
  } catch (error) {
    console.error("Error fetching products:", error)
    return []
  }
} 