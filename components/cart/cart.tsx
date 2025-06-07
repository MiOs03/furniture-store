"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { X, Minus, Plus, ShoppingBag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useCart } from "@/lib/contexts/cart-context"
import CheckoutForm from "./checkout-form"

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

export default function Cart() {
  const { items, removeItem, updateQuantity, total } = useCart()
  const [isOpen, setIsOpen] = useState(false)
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [deliveryKm, setDeliveryKm] = useState("")

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  const handleQuantityChange = (id: string | number, newQuantity: number) => {
    if (newQuantity < 1) return
    updateQuantity(id, newQuantity)
  }

  const deliveryCost = calculateDeliveryCost(deliveryKm)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingBag className="h-5 w-5" />
          {totalItems > 0 && (
            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-black text-xs text-white">
              {totalItems}
            </span>
          )}
          <span className="sr-only">Otvori korpu</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col sm:max-w-md">
        <SheetHeader>
            <SheetTitle>Vaša korpa ({totalItems})</SheetTitle>
        </SheetHeader>

        {isCheckingOut ? (
          <CheckoutForm onBack={() => setIsCheckingOut(false)} />
        ) : (
          <>
            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center space-y-4">
                <ShoppingBag className="h-16 w-16 text-muted-foreground" />
                <div className="text-center">
                  <h3 className="text-lg font-medium">Vaša korpa je prazna</h3>
                  <p className="text-sm text-muted-foreground">
                    Izgleda da niste dodali nijedan proizvod u vašu korpu još.
                  </p>
                </div>
                <Button asChild onClick={() => setIsOpen(false)}>
                  <Link href="/products">Nastavi kupovati</Link>
                </Button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto py-6 min-h-0 max-h-[60vh] sm:max-h-[80vh]">
                  <div className="space-y-6">
                    {items.map((item) => (
                      <div key={`${item.id}-${JSON.stringify(item.customizations)}`} className="flex space-x-4">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border">
                          <Image
                            src={getValidImageSrc(item.image)}
                            alt={item.name}
                            width={100}
                            height={100}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex flex-1 flex-col">
                          <div className="flex justify-between text-base font-medium">
                            <h3>
                              <Link
                                href={`/products/${item.id}`}
                                className="hover:underline"
                                onClick={() => setIsOpen(false)}
                              >
                                {item.name}
                              </Link>
                            </h3>
                            <p className="ml-4">KM {(item.price * item.quantity).toLocaleString()}</p>
                          </div>

                          {/* Customizations */}
                          {item.customizations && (
                            <div className="mt-1 text-sm text-muted-foreground">
                              {item.customizations.color && <p>Boja: {item.customizations.color}</p>}
                              {item.customizations.material && <p>Materijal: {item.customizations.material}</p>}
                              {item.customizations.dimensions && <p>Dimenzije: {item.customizations.dimensions}</p>}
                            </div>
                          )}

                          <div className="mt-auto flex items-center justify-between">
                            <div className="flex items-center border rounded-md">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-none rounded-l-md"
                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              >
                                <Minus className="h-3 w-3" />
                                <span className="sr-only">Smanji količinu</span>
                              </Button>
                              <span className="w-8 text-center text-sm">{item.quantity}</span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-none rounded-r-md"
                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              >
                                <Plus className="h-3 w-3" />
                                <span className="sr-only">Povećaj količinu</span>
                              </Button>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-muted-foreground hover:text-foreground"
                              onClick={() => removeItem(item.id)}
                            >
                              <X className="mr-1 h-4 w-4" />
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-6 bg-white sticky bottom-0 left-0 right-0 z-10 sm:static sm:z-auto sm:bg-transparent">
                  <div className="flex justify-between text-base font-medium">
                    <p>Ukupno</p>
                    <p>KM {total.toLocaleString()}</p>
                  </div>
                  <div className="mt-6">
                    <Button className="w-full" onClick={() => setIsCheckingOut(true)}>
                      Kupi
                    </Button>
                  </div>
                  <div className="mt-6 flex justify-center text-center text-sm text-muted-foreground">
                    <p>
                      or{" "}
                      <Button variant="link" className="p-0 text-sm font-medium" onClick={() => setIsOpen(false)}>
                        Nastavi kupovati
                        <span aria-hidden="true"> &rarr;</span>
                      </Button>
                    </p>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
