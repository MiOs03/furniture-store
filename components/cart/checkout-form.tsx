"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCart } from "@/lib/contexts/cart-context"
import { useToast } from "@/components/ui/use-toast"

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
  })

  const [needsDelivery, setNeedsDelivery] = useState(false)
  const [deliveryKm, setDeliveryKm] = useState("")
  const [acceptDelivery, setAcceptDelivery] = useState(false)
  const deliveryCost = Number(deliveryKm) > 30 ? Math.round(Number(deliveryKm) * 1.5 * 100) / 100 : 0
  const totalWithDelivery = total + deliveryCost

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Prevent submit if delivery is needed, km > 30, and not accepted
    if (needsDelivery && Number(deliveryKm) > 30 && !acceptDelivery) {
      toast({
        title: "Morate prihvatiti cijenu dostave da nastavite.",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    try {
      console.log('Starting order submission...');
      console.log('Cart items:', items);

      // Create order summary
      const orderSummary = items.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        customizations: item.customizations
      }))

      console.log('Order summary:', orderSummary);

      // Prepare email content
      const emailContent = {
        from: formData.email,
        subject: `Nova narudžba od ${formData.firstName} ${formData.lastName}`,
        text: `
          Nova narudžba:
          
          Kupac:
          Ime: ${formData.firstName}
          Prezime: ${formData.lastName}
          Email: ${formData.email}
          Telefon: ${formData.phone}
          
          Naručeni proizvodi:
          ${orderSummary.map(item => `
            - ${item.name} x ${item.quantity}
            ${item.customizations ? `
              Boja: ${item.customizations.color || 'N/A'}
              Materijal: ${item.customizations.material || 'N/A'}
              Dimenzije: ${item.customizations.dimensions || 'N/A'}
            ` : ''}
            Cijena: ${item.price} KM
          `).join('\n')}
          
          Ukupna cijena: ${total} KM
          Dostava: ${needsDelivery ? (Number(deliveryKm) > 30 ? `${deliveryCost} KM (${deliveryKm} km)` : 'Besplatna (<= 30km)') : 'Nije tražena'}
          Ukupno sa dostavom: ${needsDelivery ? totalWithDelivery : total} KM
        `
      }

      console.log('Sending email with content:', emailContent);

      // Send email using your email service
      const response = await fetch(`${window.location.origin}/api/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailContent),
      })

      if (!response.ok) {
        const errorData = await response.text();
        console.error('Error response:', errorData);
        throw new Error('Failed to send email');
      }

      const responseData = await response.json();
      console.log('Email API response:', responseData);

      toast({
        title: "Narudžba uspješna!",
        description: "Hvala vam na narudžbi. Uskoro ćemo vas kontaktirati.",
      })

      clearCart()
      router.push("/")
    } catch (error: any) {
      console.error('Error submitting order:', error);
      toast({
        title: "Greška",
        description: error.message || "Došlo je do greške prilikom obrade narudžbe. Molimo pokušajte ponovo.",
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
    <div className="flex flex-col h-full">
      <Button variant="ghost" onClick={onBack} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Nazad na korpu
      </Button>

      <div className="flex-1 overflow-y-auto min-h-0 max-h-[60vh] sm:max-h-[80vh] space-y-6">
        <div className="space-y-4">
          <h2 className="text-lg font-medium">Detalji narudžbe</h2>
          <div className="space-y-2">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>
                  {item.name} x {item.quantity}
                  {item.customizations && (
                    <span className="text-muted-foreground">
                      {" "}
                      ({item.customizations.color && `Boja: ${item.customizations.color}, `}
                      {item.customizations.material && `Materijal: ${item.customizations.material}, `}
                      {item.customizations.dimensions && `Dimenzije: ${item.customizations.dimensions}`})
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

        {/* Delivery Option */}
        <div className="space-y-2 border rounded-md p-4 bg-stone-50">
          <label className="flex items-center gap-2 font-medium">
            <input type="checkbox" checked={needsDelivery} onChange={e => setNeedsDelivery(e.target.checked)} />
            Trebate li dostavu?
          </label>
          {needsDelivery && (
            <div className="mt-2 space-y-2">
              <label className="flex items-center gap-2">
                Udaljenost do vaše adrese (km):
                <input
                  type="number"
                  min="1"
                  className="w-20 rounded border px-2 py-1 text-sm"
                  value={deliveryKm}
                  onChange={e => setDeliveryKm(e.target.value)}
                />
              </label>
              {deliveryKm && Number(deliveryKm) > 0 && Number(deliveryKm) <= 30 && (
                <div className="text-green-600 font-medium">Dostava je besplatna.</div>
              )}
              {deliveryKm && Number(deliveryKm) > 30 && (
                <>
                  <div className="text-base font-medium">Cijena dostave: {deliveryCost} KM</div>
                  <label className="flex items-center gap-2 mt-2">
                    <input type="checkbox" checked={acceptDelivery} onChange={e => setAcceptDelivery(e.target.checked)} required />
                    Prihvatam cijenu dostave i želim dostavu
                  </label>
                </>
              )}
            </div>
          )}
        </div>

        {/* Customer Info Fields */}
        <div className="grid grid-cols-1 gap-4">
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
        </div>
      </div>

      <div className="sticky bottom-0 left-0 right-0 z-10 bg-white pt-4 pb-1 sm:pb-4">
        <Button type="submit" className="w-full min-h-[44px]" disabled={isLoading} aria-label="Pošalji narudžbu">
          {isLoading ? "Slanje..." : "Pošalji narudžbu"}
        </Button>
      </div>
    </div>
  )
}

