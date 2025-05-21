import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function BrandIntro() {
  return (
    <section className="bg-stone-50 py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="grid gap-12 md:grid-cols-2">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h2 className="text-3xl font-light tracking-tight sm:text-4xl">Izrađeno s Ljubavlju</h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                U Nordic Haven vjerujemo da namještaj treba biti i lijep i funkcionalan, dizajniran da traje generacijama.
              </p>
            </div>
            <div className="space-y-4">
              <p>
                Svaki komad je izrađen od strane vještih zanatlija koristeći održive materijale i tradicionalne tehnike,
                kombinovane sa modernim principima dizajna. Drvo nabavljamo iz odgovorno upravljanih šuma i koristimo
                netoksične završne obrade kako bismo osigurali da je naš namještaj jednako prijatan za okoliš kao i za vaš dom.
              </p>
              <p>
                Naša predanost kvalitetu znači da nikad ne štedimo na detaljima. Od početne skice do finalnog proizvoda,
                svaki detalj je pažljivo razmatran i usavršavan kako bismo stvorili namještaj koji nije samo kupovina, već investicija
                u vaš dom i životni stil.
              </p>
            </div>
            <div className="pt-4">
              <Button asChild variant="outline" className="group">
                <Link href="/projects">
                  Pogledajte Naše Projekte{" "}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-4">
              <Image
                src="/placeholder.svg?height=300&width=300"
                alt="Zanatlija koji radi na drvenom namještaju"
                width={300}
                height={300}
                className="h-auto w-full rounded-lg object-cover"
              />
              <Image
                src="/placeholder.svg?height=300&width=300"
                alt="Uzorci drveta i dizajnerske skice"
                width={300}
                height={300}
                className="h-auto w-full rounded-lg object-cover"
              />
            </div>
            <div className="grid content-center">
              <Image
                src="/placeholder.svg?height=620&width=300"
                alt="Gotov komad namještaja u uređenoj prostoriji"
                width={300}
                height={620}
                className="h-auto w-full rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
