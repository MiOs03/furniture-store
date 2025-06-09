export interface Product {
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
  slike: string[]
  createdAt: string
  updatedAt: string
} 