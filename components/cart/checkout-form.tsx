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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

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
    <div className="space-y-6">
      <Button variant="ghost" onClick={onBack} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Nazad na korpu
      </Button>

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
              <span>${(item.price * item.quantity).toLocaleString()}</span>
            </div>
          ))}
          <div className="border-t pt-2 font-medium">
            <div className="flex justify-between">
              <span>Ukupno</span>
              <span>${total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
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

        <div className="grid gap-4 sm:grid-cols-2">
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

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Slanje narudžbe..." : "Pošalji narudžbu"}
        </Button>
      </form>
    </div>
  )
}

