"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { X, Minus, Plus } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useCart } from "@/lib/contexts/cart-context"
import CheckoutForm from "./checkout-form"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { formatPrice } from "@/lib/utils"

// Helper for delivery cost
function calculateDeliveryCost(km: string | number) {
  const num = Number(km)
  if (isNaN(num) || num <= 0) return 0
  return Math.round(num * 1.5 * 100) / 100
}

function getValidImageSrc(src: string | undefined) {
  if (!src || typeof src !== "string" || !src.trim()) return "/placeholder.svg";
  if (!src.startsWith("/")) return `/images/products/${src}`;
  return src;
}

export default function Cart({ onClose }: { onClose?: () => void }) {
  const { items, removeItem, updateQuantity, total } = useCart()
  const [deliveryKm, setDeliveryKm] = useState("")
  const router = useRouter()

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  // Helper function to format customizations
  const formatCustomizations = (customizations: any) => {
    if (!customizations) return null

    const parts = []

    if (customizations.colors?.length) {
      parts.push(`Boje: ${customizations.colors.map((c: any) => c.naziv).join(", ")}`)
    }
    if (customizations.materials?.length) {
      parts.push(`Materijali: ${customizations.materials.join(", ")}`)
    }
    if (customizations.dimensions?.length) {
      parts.push(`Dimenzije: ${customizations.dimensions.map((d: any) => `${d.naziv}: ${d.vrijednost}`).join(", ")}`)
    }

    return parts.length > 0 ? parts.join(" | ") : null
  }

  const handleQuantityChange = (id: string | number, newQuantity: number) => {
    if (newQuantity < 1) return
    updateQuantity(id, newQuantity)
  }

  const deliveryCost = calculateDeliveryCost(deliveryKm)

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <h2 className="mb-4 text-2xl font-semibold">Vaša korpa je prazna</h2>
        <p className="mb-6 text-muted-foreground">
          Dodajte proizvode u korpu da biste nastavili s kupovinom.
        </p>
        <Link href="/products">
          <Button>Pregledaj proizvode</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="flex w-full flex-col sm:max-w-md">
      <div className="space-y-4">
        {items.map((item) => (
          <Card key={String(item.id)} className="p-4">
            <div className="flex gap-4">
              <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
                <Image
                  src={getValidImageSrc(item.image)}
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </div>
              <div className="flex flex-1 flex-col">
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-lg font-medium">
                      <Link
                        href={`/products/${item.id}`}
                        className="hover:underline"
                      >
                        {item.name}
                      </Link>
                    </h3>
                    {formatCustomizations(item.customizations) && (
                      <p className="mt-1 text-sm text-muted-foreground">
                        {formatCustomizations(item.customizations)}
                      </p>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeItem(item.id)}
                    className="h-8 w-8"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleQuantityChange(item.id, Math.max(0, item.quantity - 1))}
                    >
                      -
                    </Button>
                    <Input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => {
                        const value = parseInt(e.target.value)
                        if (!isNaN(value) && value > 0) {
                          updateQuantity(item.id, value)
                        }
                      }}
                      className="h-8 w-16 text-center"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    >
                      +
                    </Button>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-medium">{formatPrice(item.price * item.quantity)}</p>
                    {item.quantity > 1 && (
                      <p className="text-sm text-muted-foreground">
                        {formatPrice(item.price)} po komadu
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
      <div className="border-t pt-6 bg-white sticky bottom-0 left-0 right-0 z-10 sm:static sm:z-auto sm:bg-transparent">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg font-medium">Ukupno</p>
            <p className="text-sm text-muted-foreground">
              Dostava se računa na kraju
            </p>
          </div>
          <p className="text-2xl font-bold">{formatPrice(total)}</p>
        </div>
        <div className="mt-6 flex gap-4">
          <Button
            variant="outline"
            className="w-full flex-1"
            onClick={() => {
              if (onClose) onClose();
              setTimeout(() => {
                router.push("/products");
              }, 200);
            }}
          >
            Nastavi kupovinu
          </Button>
          <Button
            className="w-full flex-1"
            onClick={() => {
              if (onClose) onClose();
              router.push("/checkout");
            }}
          >
            Naplata
          </Button>
        </div>
      </div>
    </div>
  )
}
