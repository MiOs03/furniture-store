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
                  Osnovana 2010. godine, Nordic Haven je započela s jednostavnom vizijom: stvoriti namještaj koji kombinira vremenski dizajn sa modernom udobnošću.
                </p>
              </div>
              <div className="space-y-4">
                <p>
                  Naše putovanje je počelo u maloj radionici u Stockholmu, gdje je naša osnivačica, Emma Lindström, izradila svoju prvu stolicu. Danas smo izrasli u tim strastvenih zanatlija i dizajnera, ali naša predanost kvalitetnoj izradi ostaje nepromijenjena.
                </p>
                <p>
                  Vjerujemo u održive prakse, nabavljajući samo najfinije materijale od odgovornih dobavljača. Svaki komad namještaja je pažljivo izrađen, dizajniran da traje generacijama, a ne samo sezonama.
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
                "Stvoriti namještaj koji poboljšava kvalitet života kroz promišljeni dizajn, održive prakse i izuzetnu izradu."
              </p>
              <p className="text-muted-foreground">
                Predani smo smanjenju našeg ekološkog otiska dok stvaramo lijep, funkcionalan namještaj koji donosi radost u vaš dom. Naši dizajni su inspirirani skandinavskim minimalizmom, fokusirajući se na čiste linije, prirodne materijale i vremensku privlačnost.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
