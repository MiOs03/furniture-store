"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCart } from "@/lib/contexts/cart-context"
import { useToast } from "@/components/ui/use-toast"

export default function CheckoutPage() {
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
  })

  const [needsDelivery, setNeedsDelivery] = useState(false)
  const [deliveryKm, setDeliveryKm] = useState("")
  const [acceptDelivery, setAcceptDelivery] = useState(false)
  const deliveryCost = Number(deliveryKm) > 30 ? Math.round(Number(deliveryKm) * 1.5 * 100) / 100 : 0
  const totalWithDelivery = total + deliveryCost

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    if (needsDelivery && Number(deliveryKm) > 30 && !acceptDelivery) {
      toast({
        title: "Morate prihvatiti cijenu dostave da nastavite.",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    try {
      // Prepare order message
      const orderSummary = items.map(item =>
        `${item.name} x ${item.quantity}` +
        (item.customizations ?
          [
            item.customizations.colors && `Boje: ${item.customizations.colors.map((c: any) => c.naziv).join(", ")}`,
            item.customizations.materials && `Materijali: ${item.customizations.materials.join(", ")}`,
            item.customizations.dimensions && `Dimenzije: ${item.customizations.dimensions.map((d: any) => `${d.naziv}: ${d.vrijednost}`).join(", ")}`
          ].filter(Boolean).join(", ") : ""
        )
      ).join("\n")

      const message = `Naručeni proizvodi:\n${orderSummary}\n\nUkupno: ${total.toLocaleString()} KM\n` +
        (needsDelivery ? `Dostava: ${deliveryKm} km${deliveryCost ? ` (${deliveryCost} KM)` : " (besplatna)"}` : "Bez dostave")

      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        message,
      }

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        throw new Error("Došlo je do greške. Pokušajte ponovo.")
      }

      toast({
        title: "Narudžba uspješno poslata",
        description: "Hvala vam na narudžbi. Uskoro ćemo vas kontaktirati.",
      })
      clearCart()
      setFormData({ firstName: "", lastName: "", email: "", phone: "", address: "" })
      setNeedsDelivery(false)
      setDeliveryKm("")
      setAcceptDelivery(false)
      setIsLoading(false)
      setTimeout(() => {
        router.push("/")
      }, 1200)
    } catch (error: any) {
      toast({
        title: "Došlo je do greške. Pokušajte ponovo.",
        description: error.message,
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className="max-w-xl mx-auto py-12 px-4">
      <h1 className="text-2xl font-bold mb-6">Naplata</h1>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-4">
          <h2 className="text-lg font-medium">Detalji narudžbe</h2>
          <div className="space-y-2">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>
                  {item.name} x {item.quantity}
                  {item.customizations && (
                    <span className="text-muted-foreground">
                      {item.customizations.colors && ` (Boje: ${item.customizations.colors.map((c: any) => c.naziv).join(", ")})`}
                      {item.customizations.materials && ` (Materijali: ${item.customizations.materials.join(", ")})`}
                      {item.customizations.dimensions && ` (Dimenzije: ${item.customizations.dimensions.map((d: any) => `${d.naziv}: ${d.vrijednost}`).join(", ")})`}
                    </span>
                  )}
                </span>
                <span>{(item.price * item.quantity).toLocaleString()} KM</span>
              </div>
            ))}
            <div className="border-t pt-2 font-medium">
              <div className="flex justify-between">
                <span>Ukupno</span>
                <span>{total.toLocaleString()} KM</span>
              </div>
              {needsDelivery && (
                <div className="mt-2 text-right">
                  {deliveryKm && Number(deliveryKm) > 0 ? (
                    <>
                      <div className="text-sm text-muted-foreground">Ukupno proizvodi: {total.toLocaleString()} KM</div>
                      <div className="text-base font-semibold text-black">Ukupno sa dostavom: {totalWithDelivery.toLocaleString()} KM</div>
                    </>
                  ) : null}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-lg font-medium">Podaci za dostavu</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">Ime</Label>
              <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="lastName">Prezime</Label>
              <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="email">Email (opcionalno)</Label>
              <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="phone">Telefon</Label>
              <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="address">Adresa za dostavu (opcionalno)</Label>
              <Input id="address" name="address" value={formData.address} onChange={handleChange} />
            </div>
          </div>
        </div>
        <div className="space-y-2 border rounded-md p-4 bg-stone-50">
          <label className="flex items-center gap-2 font-medium">
            <input type="checkbox" checked={needsDelivery} onChange={e => setNeedsDelivery(e.target.checked)} />
            Trebate li dostavu?
          </label>
          {needsDelivery && (
            <div className="mt-2 space-y-2">
              <label className="flex items-center gap-2">
                Udaljenost od Banjaluke do vaše adrese (km):
                <input
                  type="number"
                  min="1"
                  className="w-20 rounded border px-2 py-1 text-sm"
                  value={deliveryKm}
                  onChange={e => setDeliveryKm(e.target.value)}
                />
              </label>
              {Number(deliveryKm) > 30 && (
                <label className="flex items-center gap-2 text-xs text-muted-foreground">
                  <input
                    type="checkbox"
                    checked={acceptDelivery}
                    onChange={e => setAcceptDelivery(e.target.checked)}
                  />
                  Prihvatam cijenu dostave {deliveryCost} KM
                </label>
              )}
            </div>
          )}
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Slanje..." : "Pošalji narudžbu"}
        </Button>
      </form>
    </div>
  )
} 