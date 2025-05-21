import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import Footer from "@/components/layout/footer"
import Navbar from "@/components/layout/navbar"

export default function ProjectsPage() {
  const projects = [
    {
      id: 1,
      title: "Vila na Obali",
      description: "Luksuzna vila sa panoramskim pogledom na more, opremljena našim premium namještajem.",
      client: "Privatni klijent",
      location: "Neum, Bosna i Hercegovina",
      products: ["Oslo Lounge Chair", "Bergen Dining Table", "Stockholm Sofa"],
      image: "/placeholder.svg?height=600&width=800",
    },
    {
      id: 2,
      title: "Urban Loft Transformacija",
      description: "Modernizacija industrijskog prostora u elegantan urbani dom.",
      client: "Urban Living d.o.o.",
      location: "Sarajevo, Bosna i Hercegovina",
      products: ["Copenhagen Armchair", "Helsinki Coffee Table", "Oslo Lounge Chair"],
      image: "/placeholder.svg?height=600&width=800",
    },
    {
      id: 3,
      title: "Planinsko Utočište",
      description: "Rustikalni vikend dom s modernim komforom i prirodnim materijalima.",
      client: "Mountain Retreat",
      location: "Bjelašnica, Bosna i Hercegovina",
      products: ["Stockholm Sofa", "Bergen Dining Table", "Copenhagen Armchair"],
      image: "/placeholder.svg?height=600&width=800",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="container mx-auto px-4 py-16 md:px-6">
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-4xl font-light tracking-tight text-foreground md:text-5xl">
            Naši Projekti
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Otkrijte kako smo transformirali različite prostore kroz naš namještaj i dizajn.
            Svaki projekat je jedinstvena priča o stilu, funkcionalnosti i kvalitetu.
          </p>
        </div>

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group relative overflow-hidden rounded-lg bg-white shadow-lg transition-all hover:shadow-xl"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h2 className="mb-2 text-2xl font-light tracking-tight text-foreground">
                  {project.title}
                </h2>
                <p className="mb-4 text-muted-foreground">{project.description}</p>
                <div className="mb-4 space-y-2 text-sm text-muted-foreground">
                  <p><span className="font-medium">Klijent:</span> {project.client}</p>
                  <p><span className="font-medium">Lokacija:</span> {project.location}</p>
                </div>
                <div className="mb-6">
                  <h3 className="mb-2 text-sm font-medium text-foreground">Korišteni proizvodi:</h3>
                  <ul className="list-inside list-disc text-sm text-muted-foreground">
                    {project.products.map((product) => (
                      <li key={product}>{product}</li>
                    ))}
                  </ul>
                </div>
                <Button
                  variant="outline"
                  className="w-full"
                  asChild
                >
                  <Link href={`/projects/${project.id}`}>
                    Pogledaj Detalje
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button
            variant="outline"
            size="lg"
            asChild
          >
            <Link href="/contact">
              Započnite Vaš Projekt
            </Link>
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  )
}
