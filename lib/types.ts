export interface Product {
  id: string | number
  slug: string
  naziv: string
  cijena: number
  staraCijena?: number
  opis: string
  puniOpis?: string
  kategorije: string[]
  slika: string
  slike?: string[]
  ocjena?: number
  brojRecenzija?: number
  karakteristike?: string[]
  dimenzije?: Array<{ naziv: string; vrijednost: string }>
  boje?: Array<{ naziv: string; hex: string }>
  materijali?: string[]
  uputstvaZaNjegu?: string
  recenzije?: any[]
  jeNov?: boolean
  istaknut?: boolean
  createdAt?: string
  popularityScore?: number
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