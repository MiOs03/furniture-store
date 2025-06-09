"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { Product } from "@/types"

interface ProductCardProps {
  data: Product
}

export default function ProductCard({ data }: ProductCardProps) {
  const router = useRouter()

  const handleClick = () => {
    router.push(`/products/${data.id}`)
  }

  return (
    <div
      onClick={handleClick}
      className="group cursor-pointer space-y-4 rounded-xl border p-3"
    >
      <div className="aspect-square rounded-xl bg-gray-100 relative">
        <Image
          src={data.slike[0]}
          alt={data.naziv}
          fill
          className="aspect-square object-cover rounded-md"
        />
      </div>
      <div>
        <p className="text-lg font-semibold">{data.naziv}</p>
        <p className="text-sm text-gray-500">{data.kategorije[0]}</p>
      </div>
      <div className="flex items-center justify-between">
        <p className="font-semibold">
          {data.cijena.toLocaleString('hr-HR', { style: 'currency', currency: 'EUR' })}
        </p>
        {data.staraCijena && (
          <p className="text-sm text-gray-500 line-through">
            {data.staraCijena.toLocaleString('hr-HR', { style: 'currency', currency: 'EUR' })}
          </p>
        )}
      </div>
    </div>
  )
} 