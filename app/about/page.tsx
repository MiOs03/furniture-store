import Image from "next/image"

import { Card, CardContent } from "@/components/ui/card"
import Footer from "@/components/layout/footer"
import Navbar from "@/components/layout/navbar"
import StatsSection from "@/components/sections/stats-section"

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Story Section */}
        <section id="our-story" className="py-16 md:py-24">
          <div className="container grid gap-12 px-4 md:grid-cols-2 md:px-6">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-light tracking-tight sm:text-4xl md:text-5xl">Naša Priča</h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Prije više od deset godina, odlučili smo da spojimo porodične vrijednosti, zanatsku tradiciju i savremeni dizajn – i tako je nastao VSistem. Danas smo ponosna firma iz Banje Luke koja se bavi proizvodnjom namještaja po mjeri, ali naša suština je ostala ista: stvaramo prostor koji govori vašu priču.
                </p>
              </div>
              <div className="space-y-4">
                <p>
                Svaki projekat za nas je jedinstven. Bilo da izrađujemo kuhinju koja okuplja porodicu, ormar koji čuva uspomene, ili radni sto za vaše ideje, u svaki detalj ugrađujemo znanje, osjećaj za prostor i strast prema onome što radimo.
                </p>
                <p>
                VSistem nije samo proizvodnja namještaja. To je priča o prostoru koji postaje dom, o ideji koja postaje stvarnost i o svakodnevici koja postaje ljepša – kada je oblikovana po mjeri vas.
                </p>
              </div>
            </div>
            <Image
              src="/placeholder.svg?height=800&width=600"
              alt="Zanatlija koji radi na drvenom namještaju"
              width={600}
              height={800}
              className="h-auto w-full rounded-lg object-cover"
            />
          </div>
        </section>

        {/* Stats Section */}
        <StatsSection />

        {/* Mission Section */}
        <section id="our-mission" className="bg-stone-50 py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-8 text-3xl font-light tracking-tight sm:text-4xl">Naša Misija</h2>
              <p className="mb-6 text-xl text-muted-foreground">
              “U svakom komadu drveta vidimo mogućnost da stvorimo nečiji dom, nečiju svakodnevicu, nečiju priču.”              </p>
              <p className="text-muted-foreground">
              U VSistemu, naša misija je da svaki komad namještaja bude više od proizvoda – da bude osjećaj doma, izraz identiteta i odraz kvaliteta. Ne pravimo serijske komade bez duše; mi stvaramo namještaj po mjeri, izrađen precizno, s razlogom i za konkretan prostor – vaš prostor.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
