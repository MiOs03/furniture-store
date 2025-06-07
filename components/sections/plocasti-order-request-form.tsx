import { useState } from 'react'

export default function PlocastiOrderRequestForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showAlert, setShowAlert] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isFormValid) {
      setShowAlert(true)
      setTimeout(() => setShowAlert(false), 2000)
      return
    }
    setIsLoading(true)
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: form.email,
          subject: 'Zahtjev za narudžbu - Pločasti namještaj',
          text: `Novi zahtjev za narudžbu (Pločasti namještaj):\n\nIme i prezime: ${form.name}\nEmail: ${form.email}\nTelefon: ${form.phone}\nAdresa za dostavu: ${form.address}\n\nPoruka:\n${form.message}`
        }),
      })
      if (!response.ok) throw new Error('Greška pri slanju zahtjeva.')
      setSubmitted(true)
    } catch (err) {
      alert('Greška pri slanju zahtjeva. Pokušajte ponovo.')
    } finally {
      setIsLoading(false)
    }
  }

  const isFormValid = form.name.trim() && form.phone.trim() && form.address.trim() && form.message.trim();

  if (submitted) {
    return (
      <div className="p-6 bg-white rounded-md text-center">
        <h3 className="text-lg font-semibold mb-2">Zahtjev poslan!</h3>
        <p className="text-muted-foreground">Hvala na vašem zahtjevu. Naš tim će vas kontaktirati uskoro.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-md shadow">
      <h3 className="text-xl font-bold mb-4">Zahtjev za narudžbu</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium">Ime i prezime</label>
          <input name="name" type="text" required className="w-full border rounded px-3 py-2" value={form.name} onChange={handleChange} />
        </div>
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input name="email" type="email" className="w-full border rounded px-3 py-2" value={form.email} onChange={handleChange} />
        </div>
        <div>
          <label className="block mb-1 font-medium">Telefon</label>
          <input name="phone" type="tel" required className="w-full border rounded px-3 py-2" value={form.phone} onChange={handleChange} />
        </div>
        <div>
          <label className="block mb-1 font-medium">Adresa za dostavu</label>
          <input name="address" type="text" required className="w-full border rounded px-3 py-2" value={form.address} onChange={handleChange} />
        </div>
      </div>
      <div>
        <label className="block mb-1 font-medium">Poruka</label>
        <textarea name="message" rows={3} className="w-full border rounded px-3 py-2" value={form.message} onChange={handleChange} />
      </div>
      {showAlert && (
        <div className="mb-2 p-2 bg-red-100 text-red-700 rounded text-center text-sm font-medium" aria-live="polite">Unesite sve podatke</div>
      )}
      <button type="submit" className="w-full bg-accent-purple text-white py-2 rounded font-semibold mt-2 min-h-[44px]" disabled={isLoading} aria-label="Pošalji zahtjev">
        {isLoading ? 'Slanje...' : 'Pošalji zahtjev'}
      </button>
    </form>
  )
} 