"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCart } from "@/lib/contexts/cart-context"
import { useToast } from "@/components/ui/use-toast"
import { formatPrice } from "@/lib/utils"

interface CheckoutFormProps {
  onBack: () => void
}

export default function CheckoutForm({ onBack }: CheckoutFormProps) {
  const router = useRouter()
  const { items, total, clearCart } = useCart()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "Bosna i Hercegovina",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulacija procesa plaćanja
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Očisti korpu i prikaži poruku o uspjehu
      clearCart()
      toast({
        title: "Narudžba uspješna!",
        description: "Vaša narudžba je uspješno procesirana. Hvala vam na kupovini!",
      })

      // Preusmjeri na stranicu potvrde
      router.push("/order-confirmation")
    } catch (error) {
      toast({
        title: "Greška",
        description: "Došlo je do greške prilikom procesiranja vaše narudžbe. Molimo pokušajte ponovo.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={onBack} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Nazad na Korpu
      </Button>

        <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Detalji Dostave</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
              <Label htmlFor="firstName">Ime</Label>
            <Input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Prezime</Label>
              <Input
                id="lastName"
                name="lastName"
                value={formData.lastName}
              onChange={handleChange}
                required
            />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Telefon</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Adresa</Label>
            <Input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
        </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">Grad</Label>
              <Input
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
              </div>
            <div className="space-y-2">
              <Label htmlFor="postalCode">Poštanski Broj</Label>
              <Input
                id="postalCode"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="country">Država</Label>
            <Input
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
              disabled
            />
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between border-t pt-4">
              <span className="text-lg font-medium">Ukupno</span>
              <span className="text-lg font-semibold">{formatPrice(total)} KM</span>
        </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Procesiranje..." : "Potvrdi Narudžbu"}
          </Button>
        </div>
      </form>
      </div>
    </div>
  )
}

