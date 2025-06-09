import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

interface InfoProps {
  data: {
    id: string
    naziv: string
    opis: string
    cijena: number
    staraCijena?: number
    kategorije: string[]
    dimenzije: string
    materijal: string
    funkcijaRazvlacenja: string
    prostorZaOdlaganje: string
    punjenje: string
    stranaGarniture: string
    dostava: string
    napomena: string
  }
}

export default function Info({ data }: InfoProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const onAddToCart = () => {
    setIsLoading(true)
    // Add to cart logic here
    setIsLoading(false)
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-neutral-900">{data.naziv}</h1>
      <div className="mt-3 flex items-end justify-between">
        <p className="text-2xl text-neutral-900">
          {data.cijena.toLocaleString('hr-HR', { style: 'currency', currency: 'EUR' })}
        </p>
        {data.staraCijena && (
          <p className="text-lg text-neutral-500 line-through">
            {data.staraCijena.toLocaleString('hr-HR', { style: 'currency', currency: 'EUR' })}
          </p>
        )}
      </div>
      <Separator className="my-4" />
      <div className="flex flex-col gap-y-6">
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Dimenzije:</h3>
          <p>{data.dimenzije}</p>
        </div>
        {data.materijal && (
          <div className="flex items-center gap-x-4">
            <h3 className="font-semibold text-black">Materijal:</h3>
            <p>{data.materijal}</p>
          </div>
        )}
        {data.funkcijaRazvlacenja && data.funkcijaRazvlacenja !== "/" && (
          <div className="flex items-center gap-x-4">
            <h3 className="font-semibold text-black">Funkcija razvlačenja:</h3>
            <p>{data.funkcijaRazvlacenja}</p>
          </div>
        )}
        {data.prostorZaOdlaganje && data.prostorZaOdlaganje !== "/" && (
          <div className="flex items-center gap-x-4">
            <h3 className="font-semibold text-black">Prostor za odlaganje:</h3>
            <p>{data.prostorZaOdlaganje}</p>
          </div>
        )}
        {data.punjenje && data.punjenje !== "/" && (
          <div className="flex items-center gap-x-4">
            <h3 className="font-semibold text-black">Punjenje:</h3>
            <p>{data.punjenje}</p>
          </div>
        )}
        {data.stranaGarniture && data.stranaGarniture !== "/" && (
          <div className="flex items-center gap-x-4">
            <h3 className="font-semibold text-black">Strana garniture:</h3>
            <p>{data.stranaGarniture}</p>
          </div>
        )}
      </div>
      <Separator className="my-4" />
      <div className="mt-10 flex items-center gap-x-3">
        <Button
          onClick={onAddToCart}
          disabled={isLoading}
          className="w-full"
        >
          Dodaj u korpu
        </Button>
      </div>
    </div>
  )
} 