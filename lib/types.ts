export interface Product {
  id: number
  name: string
  price: number
  oldPrice?: number
  description: string
  fullDescription?: string
  category: string
  categoryName: string
  image: string
  images: string[]
  rating: number
  reviewCount: number
  features?: string[]
  dimensions: { name: string; value: string }[]
  colors?: { name: string; hex: string }[]
  materials?: string[]
  careInstructions?: string
  reviews?: {
    author: string
    rating: number
    date: string
    content: string
  }[]
}

export interface CustomizationType {
  color?: string
  material?: string
  dimensions?: {
    width: string
    depth: string
    height: string
  }
}