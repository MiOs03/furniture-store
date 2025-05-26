import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { AddToCartButton } from "@/components/cart/add-to-cart-button"

interface ProductCardProps {
  product: {
    id: number
    name: string
    price: number
    oldPrice?: number
    description: string
    category: string
    image: string
  }
}

export default function ProductCard({ product }: ProductCardProps) {
  const discount = product.oldPrice 
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0

  return (
    <Link 
      href={`/products/${product.id}`}
      className="block h-full"
      aria-label={`View details for ${product.name}`}
    >
      <Card className="group h-full overflow-hidden rounded-lg border-none bg-surface transition-all duration-300 hover:shadow-lg">
        <div className="relative aspect-square">
          <Image 
            src={product.image} 
            alt={product.name} 
            fill 
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105" 
            quality={85}
          />
          {product.oldPrice && (
            <span 
              className="absolute right-2 top-2 rounded bg-accent px-2 py-1 text-xs font-medium text-white"
              aria-label={`${discount}% off`}
            >
              {discount}% OFF
            </span>
          )}
        </div>
        <CardContent className="flex h-full flex-col justify-between p-4">
          <div>
            <h3 className="mb-1 text-lg font-medium line-clamp-1">{product.name}</h3>
          <p className="mb-2 line-clamp-2 text-sm text-muted-foreground">{product.description}</p>
          </div>
          <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-lg font-medium">${product.price.toLocaleString()}</span>
            {product.oldPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${product.oldPrice.toLocaleString()}
              </span>
            )}
            </div>
            <div className="opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              <AddToCartButton 
                product={product}
                variant="secondary"
                size="sm"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
