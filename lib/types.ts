export interface Product {
  id: string | number
  slug: string
  naziv: string
  cijena: number
  staraCijena?: number
  opis: string
  puniOpis: string
  kategorije: string[]
  slika: string
  slike: string[]
  ocjena: number
  brojRecenzija: number
  karakteristike: string[]
  dimenzije: { naziv: string; vrijednost: string }[]
  boje: { naziv: string; hex: string }[]
  materijali: string[]
  uputstvaZaNjegu: string
  recenzije: {
    autor: string
    ocjena: number
    datum: string
    sadrzaj: string
  }[]
  jeNov?: boolean
  istaknut?: boolean
}

export interface CustomizationType {
  boja?: string
  materijal?: string
  dimenzije?: {
    sirina: string
    dubina: string
    visina: string
  }
}