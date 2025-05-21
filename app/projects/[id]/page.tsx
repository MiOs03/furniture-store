import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import Footer from "@/components/layout/footer"
import Navbar from "@/components/layout/navbar"

const projects = [
  {
    id: 1,
    title: "Vila na Obali",
    description: "Luksuzna vila sa panoramskim pogledom na more, opremljena našim premium namještajem.",
    fullDescription: `Ova impresivna vila na obali Neuma predstavlja savršenu kombinaciju luksuza i prirodnog okruženja. Projekt je bio fokusiran na stvaranje prostora koji odaje počast prirodnom okruženju dok pruža savremenu udobnost.

    Naš tim je radio usko sa vlasnicima da bi razumio njihove potrebe i viziju. Rezultat je prostor koji kombinira skandinavski minimalizam sa mediteranskim uticajima, stvarajući jedinstvenu atmosferu koja odgovara lokaciji.
    
    Posebna pažnja je posvećena izboru materijala koji su održivi i otporni na morsku klimu, dok zadržavaju estetsku privlačnost.`,
    client: "Privatni klijent",
    location: "Neum, Bosna i Hercegovina",
    products: ["Oslo Lounge Chair", "Bergen Dining Table", "Stockholm Sofa"],
    images: [
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
    ],
    features: [
      "Panoramski pogled na more",
      "Otvoreni plan stana",
      "Prirodno osvjetljenje",
      "Integrisani skladišni prostori",
      "Energetski efikasni elementi",
    ],
  },
  {
    id: 2,
    title: "Urban Loft Transformacija",
    description: "Modernizacija industrijskog prostora u elegantan urbani dom.",
    fullDescription: `Transformacija industrijskog prostora u centru Sarajeva u moderan urbani dom predstavlja jedan od naših najambicioznijih projekata. Originalni prostor je bio prazan industrijski objekat koji je zahtijevao potpunu rekonstrukciju.

    Naš pristup je bio da zadržimo industrijski karakter prostora dok dodajemo moderne elemente komfora. Eksponirani beton, metalne konstrukcije i veliki prozori su zadržani i integrisani u novi dizajn.
    
    Poseban izazov je bio kreiranje funkcionalnih zona unutar otvorenog plana stana, gdje smo koristili namještaj i dekorativne elemente da definišemo različite prostorije.`,
    client: "Urban Living d.o.o.",
    location: "Sarajevo, Bosna i Hercegovina",
    products: ["Copenhagen Armchair", "Helsinki Coffee Table", "Oslo Lounge Chair"],
    images: [
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
    ],
    features: [
      "Otvoreni plan stana",
      "Eksponirani industrijski elementi",
      "Modularni namještaj",
      "Pametno osvjetljenje",
      "Integrisani radni prostor",
    ],
  },
  {
    id: 3,
    title: "Planinsko Utočište",
    description: "Rustikalni vikend dom s modernim komforom i prirodnim materijalima.",
    fullDescription: `Planinsko utočište na Bjelašnici je projekt koji kombinira tradicionalnu planinsku arhitekturu sa modernim komforom. Glavni cilj je bio stvoriti prostor koji se prirodno uklapa u okolinu dok pruža sve udobnosti savremenog života.

    Dizajn je inspirisan tradicionalnim planinskim kolibama, ali sa modernim twistom. Koristili smo prirodne materijale poput drveta i kamena, kombinovane sa modernim izolacionim materijalima za optimalnu energetsku efikasnost.
    
    Unutrašnji prostor je dizajniran da bude toplo i pozivno, sa velikim prozorima koji pružaju spektakularne poglede na planine.`,
    client: "Mountain Retreat",
    location: "Bjelašnica, Bosna i Hercegovina",
    products: ["Stockholm Sofa", "Bergen Dining Table", "Copenhagen Armchair"],
    images: [
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
    ],
    features: [
      "Prirodni materijali",
      "Energetski efikasan",
      "Panoramski pogledi",
      "Integrisani sistem grijanja",
      "Prostor za odmor i rekreaciju",
    ],
  },
]

export default function ProjectPage({ params }: { params: { id: string } }) {
  const project = projects.find((p) => p.id === parseInt(params.id))

  if (!project) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">
          <div className="container mx-auto px-4 py-16 text-center">
            <h1 className="mb-4 text-4xl font-light">Projekat nije pronađen</h1>
            <Button asChild>
              <Link href="/projects">Povratak na Projekte</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[60vh] w-full">
          <Image
            src={project.images[0]}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="mb-4 text-4xl font-light md:text-5xl">{project.title}</h1>
              <p className="text-lg md:text-xl">{project.location}</p>
            </div>
          </div>
        </section>

        {/* Project Details */}
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-12 md:grid-cols-2">
              <div className="space-y-8">
                <div>
                  <h2 className="mb-4 text-2xl font-light">O Projektu</h2>
                  <p className="whitespace-pre-line text-muted-foreground">{project.fullDescription}</p>
                </div>
                <div>
                  <h2 className="mb-4 text-2xl font-light">Klijent</h2>
                  <p className="text-muted-foreground">{project.client}</p>
                </div>
                <div>
                  <h2 className="mb-4 text-2xl font-light">Lokacija</h2>
                  <p className="text-muted-foreground">{project.location}</p>
                </div>
                <div>
                  <h2 className="mb-4 text-2xl font-light">Korišteni Proizvodi</h2>
                  <ul className="list-inside list-disc text-muted-foreground">
                    {project.products.map((product) => (
                      <li key={product}>{product}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h2 className="mb-4 text-2xl font-light">Ključne Karakteristike</h2>
                  <ul className="list-inside list-disc text-muted-foreground">
                    {project.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="space-y-8">
                {project.images.slice(1).map((image, index) => (
                  <div key={index} className="relative aspect-[4/3] overflow-hidden rounded-lg">
                    <Image
                      src={image}
                      alt={`${project.title} - Slika ${index + 2}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-stone-50 py-16">
          <div className="container mx-auto px-4 text-center md:px-6">
            <h2 className="mb-4 text-3xl font-light">Započnite Vaš Projekt</h2>
            <p className="mb-8 text-muted-foreground">
              Kontaktirajte nas da razgovaramo o vašem projektu i kako možemo pomoći u realizaciji vaše vizije.
            </p>
            <Button size="lg" asChild>
              <Link href="/contact">Kontaktirajte Nas</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
} 